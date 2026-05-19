import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ImagePlus,
  Loader2,
  MapPin,
  Plus,
  Rocket,
  Store,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useOnboardingState } from "../features/onboarding/hooks/useOnboarding";
import {
  completeMenuStep,
  createCategory,
  createMenuItem,
  createRestaurant,
  getCategories,
  getRestaurantMenu,
  publishRestaurant,
  updateBranding,
  updateDelivery,
  updateRestaurant,
} from "../features/onboarding/services/onboarding.api";
import {
  ONBOARDING_STEPS,
  type OnboardingStepId,
  useOnboardingStore,
} from "../features/onboarding/store/onboarding.store";
import type { Category, MenuItem, Restaurant } from "../types/api";

const stepIcon: Record<OnboardingStepId, typeof Store> = {
  welcome: Store,
  "restaurant-info": MapPin,
  branding: ImagePlus,
  "menu-setup": UtensilsCrossed,
  delivery: Truck,
  preview: Store,
  publish: Rocket,
};

const stepByNumber: Record<number, OnboardingStepId> = {
  1: "branding",
  2: "branding",
  3: "menu-setup",
  4: "delivery",
  5: "preview",
  6: "publish",
};

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong. Try again.";

const parseCuisine = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const PartnerOnboardingPage = () => {
  const navigate = useNavigate();
  const { user, isLoading: isAuthLoading, refetchUser } = useAuth();
  const onboardingQuery = useOnboardingState();
  const restaurantId = useOnboardingStore((state) => state.restaurantId);
  const currentStep = useOnboardingStore((state) => state.currentStep);
  const draft = useOnboardingStore((state) => state.draft);
  const setRestaurantId = useOnboardingStore((state) => state.setRestaurantId);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const setDraft = useOnboardingStore((state) => state.setDraft);
  const hydrateFromRestaurant = useOnboardingStore((state) => state.hydrateFromRestaurant);
  const resetOnboarding = useOnboardingStore((state) => state.reset);
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [itemForm, setItemForm] = useState({
    categoryId: "",
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const activeIndex = ONBOARDING_STEPS.findIndex((step) => step.id === currentStep);
  const activeRestaurantId = restaurantId ?? onboardingQuery.data?.restaurant?._id ?? null;
  const restaurant = onboardingQuery.data?.restaurant ?? null;
  const cuisineText = useMemo(() => draft.cuisineTypes.join(", "), [draft.cuisineTypes]);

  useEffect(() => {
    if (onboardingQuery.data?.restaurant) {
      const existingRestaurant = onboardingQuery.data.restaurant;
      hydrateFromRestaurant(existingRestaurant);
      setCurrentStep(stepByNumber[existingRestaurant.onboardingStep] ?? "restaurant-info");
    }
  }, [hydrateFromRestaurant, onboardingQuery.data?.restaurant, setCurrentStep]);

  useEffect(() => {
    const loadMenu = async () => {
      if (!activeRestaurantId) {
        return;
      }

      const [loadedCategories, menu] = await Promise.all([
        getCategories(activeRestaurantId),
        getRestaurantMenu(activeRestaurantId),
      ]);
      setCategories(loadedCategories);
      setMenuItems(menu.items);
    };

    void loadMenu();
  }, [activeRestaurantId]);

  useEffect(() => {
    const firstCategory = categories[0];
    if (!itemForm.categoryId && firstCategory) {
      setItemForm((current) => ({ ...current, categoryId: firstCategory._id }));
    }
  }, [categories, itemForm.categoryId]);

  if (isAuthLoading || onboardingQuery.isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-bg">
        <Loader2 className="size-6 animate-spin text-brand" />
      </div>
    );
  }

  if (!user) {
    return <Navigate replace to="/partners/register" />;
  }

  if (user.role !== "owner" && user.role !== "admin") {
    return <Navigate replace to="/" />;
  }

  if (!user.isVerified) {
    return <Navigate replace to="/verify-email" />;
  }

  if (user.onboardingCompleted) {
    return <Navigate replace to="/dashboard" />;
  }

  const goToStep = (step: OnboardingStepId) => {
    setError("");
    setMessage("");
    setCurrentStep(step);
  };

  const nextStep = () => {
    const next = ONBOARDING_STEPS[activeIndex + 1];
    if (next) {
      goToStep(next.id);
    }
  };

  const previousStep = () => {
    const previous = ONBOARDING_STEPS[activeIndex - 1];
    if (previous) {
      goToStep(previous.id);
    }
  };

  const refreshState = async () => {
    await onboardingQuery.refetch();
  };

  const saveRestaurantInfo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSaving(true);

    try {
      const payload = {
        name: draft.name,
        phoneNumber: draft.phoneNumber,
        description: draft.description,
        cuisineTypes: draft.cuisineTypes,
        address: draft.address,
        ...(draft.email ? { email: draft.email } : {}),
      };

      const savedRestaurant = activeRestaurantId
        ? await updateRestaurant(activeRestaurantId, payload)
        : await createRestaurant(payload);

      setRestaurantId(savedRestaurant._id);
      hydrateFromRestaurant(savedRestaurant);
      await refreshState();
      goToStep("branding");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSaving(false);
    }
  };

  const saveBranding = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!activeRestaurantId) {
      setError("Create restaurant info first.");
      return;
    }

    setError("");
    setMessage("");
    setIsSaving(true);

    try {
      const savedRestaurant = await updateBranding(activeRestaurantId, {
        description: draft.description,
        ...(draft.logo ? { logo: draft.logo } : {}),
        ...(draft.coverImage ? { coverImage: draft.coverImage } : {}),
      });
      hydrateFromRestaurant(savedRestaurant);
      await refreshState();
      goToStep("menu-setup");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSaving(false);
    }
  };

  const addCategory = async () => {
    if (!activeRestaurantId || !categoryName.trim()) {
      return;
    }

    setError("");
    setIsSaving(true);
    try {
      const category = await createCategory({ restaurantId: activeRestaurantId, name: categoryName.trim() });
      setCategories((current) => [...current, category]);
      setCategoryName("");
      setItemForm((current) => ({ ...current, categoryId: category._id }));
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSaving(false);
    }
  };

  const addMenuItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!activeRestaurantId) {
      setError("Create restaurant info first.");
      return;
    }

    setError("");
    setIsSaving(true);
    try {
      const itemPayload = {
        restaurantId: activeRestaurantId,
        categoryId: itemForm.categoryId,
        name: itemForm.name,
        description: itemForm.description,
        price: Number(itemForm.price),
        ...(itemForm.image ? { image: itemForm.image } : {}),
      };
      const item = await createMenuItem(itemPayload);
      setMenuItems((current) => [...current, item]);
      setItemForm((current) => ({ ...current, name: "", description: "", price: "", image: "" }));
      setMessage("Menu item added.");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSaving(false);
    }
  };

  const finishMenu = async () => {
    if (!activeRestaurantId) {
      return;
    }

    setError("");
    setIsSaving(true);
    try {
      await completeMenuStep(activeRestaurantId);
      await refreshState();
      goToStep("delivery");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSaving(false);
    }
  };

  const saveDelivery = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!activeRestaurantId) {
      return;
    }

    setError("");
    setIsSaving(true);
    try {
      const savedRestaurant = await updateDelivery(activeRestaurantId, {
        deliveryFee: draft.deliveryFee,
        pickupAvailable: draft.pickupAvailable,
        deliveryRadiusKm: draft.deliveryRadiusKm,
        prepTimeMinutes: draft.prepTimeMinutes,
      });
      hydrateFromRestaurant(savedRestaurant);
      await refreshState();
      goToStep("preview");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSaving(false);
    }
  };

  const publish = async () => {
    if (!activeRestaurantId) {
      return;
    }

    setError("");
    setIsSaving(true);
    try {
      await publishRestaurant(activeRestaurantId);
      resetOnboarding();
      await refetchUser();
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-foreground lg:grid lg:grid-cols-[290px_minmax(0,1fr)]">
      <aside className="flex flex-col bg-sidebar px-5 py-6 text-white">
        <Link className="flex items-center gap-3" to="/">
          <span className="grid size-10 place-items-center rounded-md bg-brand font-semibold">CM</span>
          <div>
            <strong>CHOPMATE</strong>
            <p className="text-xs text-white/60">Restaurant setup</p>
          </div>
        </Link>

        <nav className="mt-8 grid gap-2">
          {ONBOARDING_STEPS.map((step, index) => {
            const Icon = stepIcon[step.id];
            const isActive = step.id === currentStep;
            const isComplete = index < activeIndex;

            return (
              <button
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-3 text-left text-sm transition-colors",
                  isActive ? "bg-brand text-white" : isComplete ? "bg-white/10 text-white" : "text-white/55",
                )}
                key={step.id}
                onClick={() => goToStep(step.id)}
                type="button"
              >
                <span className="grid size-7 place-items-center rounded-full bg-white/10">
                  {isComplete ? <Check className="size-4" /> : <Icon className="size-4" />}
                </span>
                {step.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto rounded-md bg-white/10 p-4 text-sm text-white/70">
          Progress persists in your account and local draft state.
        </div>
      </aside>

      <main className="px-5 py-6 md:px-8 lg:px-10">
        <header className="mb-8 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
              Step {activeIndex + 1} of {ONBOARDING_STEPS.length}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              {ONBOARDING_STEPS[activeIndex]?.label}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button disabled={activeIndex === 0} onClick={previousStep} type="button" variant="outline">
              <ArrowLeft className="mr-2 size-4" />
              Back
            </Button>
            <Button onClick={nextStep} type="button" variant="secondary">
              Skip
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </header>

        {error ? <p className="mb-5 rounded-md bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p> : null}
        {message ? <p className="mb-5 rounded-md bg-success/10 px-4 py-3 text-sm text-success">{message}</p> : null}

        {currentStep === "welcome" ? (
          <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <div className="rounded-lg border border-border bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-3xl font-semibold tracking-tight">Get live in under 10 minutes.</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
                We will create your restaurant only when you submit business info, then guide you
                through branding, your first menu item, delivery settings, preview, and publish.
              </p>
              <Button className="mt-8" onClick={() => goToStep("restaurant-info")} type="button">
                Start setup
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
            <PreviewCard restaurant={restaurant} menuItems={menuItems} />
          </section>
        ) : null}

        {currentStep === "restaurant-info" ? (
          <form className="grid gap-6 lg:grid-cols-[1fr_0.75fr]" onSubmit={saveRestaurantInfo}>
            <section className="rounded-lg border border-border bg-white p-6 shadow-sm">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 md:col-span-2">
                  <span className="text-sm font-medium">Restaurant name</span>
                  <Input
                    onChange={(event) => setDraft({ name: event.target.value })}
                    placeholder="Burger Hub"
                    required
                    value={draft.name}
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Phone number</span>
                  <Input
                    onChange={(event) => setDraft({ phoneNumber: event.target.value })}
                    placeholder="090000000"
                    required
                    value={draft.phoneNumber}
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Business email</span>
                  <Input
                    onChange={(event) => setDraft({ email: event.target.value })}
                    placeholder="orders@burgerhub.com"
                    type="email"
                    value={draft.email}
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Country</span>
                  <Input
                    onChange={(event) =>
                      setDraft({ address: { ...draft.address, country: event.target.value } })
                    }
                    required
                    value={draft.address.country}
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">State</span>
                  <Input
                    onChange={(event) => setDraft({ address: { ...draft.address, state: event.target.value } })}
                    placeholder="Lagos"
                    required
                    value={draft.address.state}
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">City</span>
                  <Input
                    onChange={(event) => setDraft({ address: { ...draft.address, city: event.target.value } })}
                    placeholder="Lekki"
                    required
                    value={draft.address.city}
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Street</span>
                  <Input
                    onChange={(event) => setDraft({ address: { ...draft.address, street: event.target.value } })}
                    placeholder="12 Admiralty Way"
                    required
                    value={draft.address.street}
                  />
                </label>
                <label className="grid gap-2 md:col-span-2">
                  <span className="text-sm font-medium">Cuisine types</span>
                  <Input
                    onChange={(event) => setDraft({ cuisineTypes: parseCuisine(event.target.value) })}
                    placeholder="Fast Food, Burgers"
                    required
                    value={cuisineText}
                  />
                </label>
                <label className="grid gap-2 md:col-span-2">
                  <span className="text-sm font-medium">Description</span>
                  <textarea
                    className="min-h-28 rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20"
                    onChange={(event) => setDraft({ description: event.target.value })}
                    placeholder="A short customer-facing description."
                    value={draft.description}
                  />
                </label>
              </div>
              <Button className="mt-6" disabled={isSaving} type="submit">
                {isSaving ? "Saving..." : activeRestaurantId ? "Save info" : "Create restaurant draft"}
              </Button>
            </section>
            <PreviewCard restaurant={restaurant} menuItems={menuItems} />
          </form>
        ) : null}

        {currentStep === "branding" ? (
          <form className="grid gap-6 lg:grid-cols-[1fr_0.75fr]" onSubmit={saveBranding}>
            <section className="rounded-lg border border-border bg-white p-6 shadow-sm">
              <div className="grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Logo URL</span>
                  <Input
                    onChange={(event) => setDraft({ logo: event.target.value })}
                    placeholder="https://..."
                    type="url"
                    value={draft.logo}
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Cover image URL</span>
                  <Input
                    onChange={(event) => setDraft({ coverImage: event.target.value })}
                    placeholder="https://..."
                    type="url"
                    value={draft.coverImage}
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Customer-facing description</span>
                  <textarea
                    className="min-h-32 rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20"
                    onChange={(event) => setDraft({ description: event.target.value })}
                    value={draft.description}
                  />
                </label>
              </div>
              <Button className="mt-6" disabled={isSaving || !activeRestaurantId} type="submit">
                Save branding
              </Button>
            </section>
            <PreviewCard restaurant={restaurant} menuItems={menuItems} />
          </form>
        ) : null}

        {currentStep === "menu-setup" ? (
          <section className="grid gap-6 lg:grid-cols-[1fr_0.75fr]">
            <div className="space-y-6">
              <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold">Categories</h2>
                <div className="mt-4 flex gap-3">
                  <Input
                    onChange={(event) => setCategoryName(event.target.value)}
                    placeholder="Burgers"
                    value={categoryName}
                  />
                  <Button disabled={isSaving || !activeRestaurantId} onClick={addCategory} type="button">
                    <Plus className="size-4" />
                  </Button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <span className="rounded-full bg-brand-muted px-3 py-1 text-sm text-brand" key={category._id}>
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>

              <form className="rounded-lg border border-border bg-white p-6 shadow-sm" onSubmit={addMenuItem}>
                <h2 className="text-xl font-semibold">First menu item</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Category</span>
                    <select
                      className="h-12 rounded-md border border-input bg-white px-3 text-sm shadow-sm"
                      onChange={(event) => setItemForm((current) => ({ ...current, categoryId: event.target.value }))}
                      required
                      value={itemForm.categoryId}
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Price</span>
                    <Input
                      min="0"
                      onChange={(event) => setItemForm((current) => ({ ...current, price: event.target.value }))}
                      placeholder="4500"
                      required
                      type="number"
                      value={itemForm.price}
                    />
                  </label>
                  <label className="grid gap-2 md:col-span-2">
                    <span className="text-sm font-medium">Item name</span>
                    <Input
                      onChange={(event) => setItemForm((current) => ({ ...current, name: event.target.value }))}
                      placeholder="Classic smash burger"
                      required
                      value={itemForm.name}
                    />
                  </label>
                  <label className="grid gap-2 md:col-span-2">
                    <span className="text-sm font-medium">Image URL</span>
                    <Input
                      onChange={(event) => setItemForm((current) => ({ ...current, image: event.target.value }))}
                      placeholder="https://..."
                      type="url"
                      value={itemForm.image}
                    />
                  </label>
                  <label className="grid gap-2 md:col-span-2">
                    <span className="text-sm font-medium">Description</span>
                    <textarea
                      className="min-h-24 rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20"
                      onChange={(event) =>
                        setItemForm((current) => ({ ...current, description: event.target.value }))
                      }
                      value={itemForm.description}
                    />
                  </label>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button disabled={isSaving || categories.length === 0} type="submit">
                    Add item
                  </Button>
                  <Button
                    disabled={isSaving || categories.length === 0 || menuItems.length === 0}
                    onClick={finishMenu}
                    type="button"
                    variant="secondary"
                  >
                    Continue to delivery
                  </Button>
                </div>
              </form>
            </div>
            <PreviewCard restaurant={restaurant} menuItems={menuItems} />
          </section>
        ) : null}

        {currentStep === "delivery" ? (
          <form className="grid gap-6 lg:grid-cols-[1fr_0.75fr]" onSubmit={saveDelivery}>
            <section className="rounded-lg border border-border bg-white p-6 shadow-sm">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Delivery fee</span>
                  <Input
                    min="0"
                    onChange={(event) => setDraft({ deliveryFee: Number(event.target.value) })}
                    type="number"
                    value={draft.deliveryFee}
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Delivery radius (km)</span>
                  <Input
                    min="0"
                    onChange={(event) => setDraft({ deliveryRadiusKm: Number(event.target.value) })}
                    type="number"
                    value={draft.deliveryRadiusKm}
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Prep time (minutes)</span>
                  <Input
                    min="5"
                    onChange={(event) => setDraft({ prepTimeMinutes: Number(event.target.value) })}
                    type="number"
                    value={draft.prepTimeMinutes}
                  />
                </label>
                <label className="flex items-center gap-3 rounded-md border border-border bg-muted px-4 py-3">
                  <input
                    checked={draft.pickupAvailable}
                    onChange={(event) => setDraft({ pickupAvailable: event.target.checked })}
                    type="checkbox"
                  />
                  <span className="text-sm font-medium">Pickup available</span>
                </label>
              </div>
              <Button className="mt-6" disabled={isSaving} type="submit">
                Save delivery settings
              </Button>
            </section>
            <PreviewCard restaurant={restaurant} menuItems={menuItems} />
          </form>
        ) : null}

        {currentStep === "preview" ? (
          <section className="grid gap-6 lg:grid-cols-[1fr_0.75fr]">
            <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">Customer preview</h2>
              <p className="mt-2 text-muted-foreground">
                This mirrors the customer-facing restaurant surface before you publish.
              </p>
              <Button className="mt-6" onClick={() => goToStep("publish")} type="button">
                Looks good
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
            <PreviewCard restaurant={restaurant} menuItems={menuItems} />
          </section>
        ) : null}

        {currentStep === "publish" ? (
          <section className="grid gap-6 lg:grid-cols-[1fr_0.75fr]">
            <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">Publish restaurant</h2>
              <div className="mt-5 grid gap-3">
                <ChecklistItem done={Boolean(activeRestaurantId)} label="Restaurant draft created" />
                <ChecklistItem done={Boolean(draft.logo || draft.coverImage || draft.description)} label="Branding added" />
                <ChecklistItem done={menuItems.length > 0} label="At least one menu item added" />
                <ChecklistItem done={draft.deliveryRadiusKm >= 0 && draft.prepTimeMinutes >= 5} label="Delivery configured" />
              </div>
              <Button className="mt-6" disabled={isSaving} onClick={publish} type="button">
                {isSaving ? "Publishing..." : "Publish and enter dashboard"}
                <Rocket className="ml-2 size-4" />
              </Button>
            </div>
            <PreviewCard restaurant={restaurant} menuItems={menuItems} />
          </section>
        ) : null}
      </main>
    </div>
  );
};

const ChecklistItem = ({ done, label }: { done: boolean; label: string }) => (
  <div className="flex items-center gap-3 rounded-md bg-muted px-4 py-3">
    <span
      className={cn(
        "grid size-6 place-items-center rounded-full text-white",
        done ? "bg-success" : "bg-muted-foreground/35",
      )}
    >
      <Check className="size-4" />
    </span>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const PreviewCard = ({
  restaurant,
  menuItems,
}: {
  restaurant: Restaurant | null;
  menuItems: MenuItem[];
}) => {
  const coverImage =
    restaurant?.coverImage ||
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80";

  return (
    <aside className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
      <div className="relative h-52">
        <img alt="" className="h-full w-full object-cover" src={coverImage} />
        <div className="absolute inset-0 bg-detail-overlay" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-2xl font-semibold">{restaurant?.name || "Your restaurant"}</p>
          <p className="mt-1 text-sm text-white/80">
            {restaurant?.cuisine.join(", ") || "Cuisine types"} · {restaurant?.address.city || "City"}
          </p>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm leading-6 text-muted-foreground">
          {restaurant?.description || "Your description will show customers what makes this restaurant worth ordering from."}
        </p>
        <div className="mt-5 grid gap-3">
          {(menuItems.length ? menuItems : []).slice(0, 3).map((item) => (
            <div className="flex items-center justify-between rounded-md border border-border p-3" key={item._id}>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="line-clamp-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
              <span className="font-semibold">₦{item.price.toLocaleString()}</span>
            </div>
          ))}
          {menuItems.length === 0 ? (
            <div className="rounded-md border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
              Menu preview appears after your first item.
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
};
