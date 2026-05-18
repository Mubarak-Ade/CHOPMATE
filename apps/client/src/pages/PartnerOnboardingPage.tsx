import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Bell,
  BookOpen,
  Building2,
  CheckCircle2,
  CircleHelp,
  CreditCard,
  LayoutGrid,
  Plus,
  Rocket,
  Shield,
  Store,
  Table2,
  Upload,
  Users,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";

type StepId = "identity" | "operations" | "menu" | "tables" | "payments" | "review";

const steps: { id: StepId; label: string; icon: typeof Store }[] = [
  { id: "identity", label: "Business Identity", icon: Building2 },
  { id: "operations", label: "Operational Details", icon: Users },
  { id: "menu", label: "Menu Setup", icon: BookOpen },
  { id: "tables", label: "Table Setup", icon: Table2 },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "review", label: "Review & Launch", icon: Rocket },
];

const cuisineTags = [
  "Contemporary American",
  "Italian",
  "Japanese",
  "French Modern",
  "Nordic",
  "+ Add Others",
];

const sectionCards = [
  { title: "Main Dining Room", count: "12 Tables • 48 Total Capacity" },
  { title: "The Patio", count: "6 Tables • 24 Total Capacity" },
  { title: "Cocktail Bar", count: "8 Seats • 8 Total Capacity" },
  { title: "Private Library", count: "2 Tables • 10 Total Capacity" },
];

const tableCards = [
  { code: "M1", name: "Window Booth", capacity: "Capacity: 4 Guests", tags: ["Booth", "Window"] },
  { code: "M2", name: "Central Round", capacity: "Capacity: 6 Guests", tags: ["Round"] },
  { code: "M3", name: "Corner Two", capacity: "Capacity: 2 Guests", tags: ["Square", "High-Top"] },
];

const payoutSchedules = [
  { label: "Daily", detail: "T+2 Rolling Basis", active: true },
  { label: "Weekly", detail: "Every Monday" },
  { label: "Monthly", detail: "Last Business Day" },
];

const menuCategories = [
  {
    section: "Section 01",
    title: "Starters",
    empty: true,
  },
  {
    section: "Section 02",
    title: "Mains",
    itemName: "Pan-Seared Ribeye",
    price: "42.00",
    description: "Dry-aged 14 days, served with truffle butter and seasonal root vegetables.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
  },
];

const progressLabel = (index: number) => `Step ${index + 1} of ${steps.length}`;

export const PartnerOnboardingPage = () => {
  const [activeStep, setActiveStep] = useState<StepId>("identity");
  const stepIndex = useMemo(
    () => steps.findIndex((step) => step.id === activeStep),
    [activeStep],
  );

  const nextStep = () => {
    const next = steps[stepIndex + 1];
    if (next) {
      setActiveStep(next.id);
    }
  };

  const previousStep = () => {
    const previous = steps[stepIndex - 1];
    if (previous) {
      setActiveStep(previous.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf7f3] text-[#161311] lg:grid lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="flex flex-col bg-[#2d2a29] px-6 py-8 text-white shadow-[24px_0_70px_rgba(23,18,14,0.12)]">
        <div>
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#c64a12] text-white shadow-lg">
              <Store className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-[-0.04em]">Editorial Hospitality</p>
              <p className="text-sm text-white/65">Onboarding Concierge</p>
            </div>
          </div>

          <div className="mt-10 grid gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === activeStep;
              const isComplete = index < stepIndex;

              return (
                <button
                  className={cn(
                    "flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition-colors",
                    isActive
                      ? "bg-[#c64a12] text-white"
                      : "text-white/65 hover:bg-white/5 hover:text-white",
                  )}
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  type="button"
                >
                  <span
                    className={cn(
                      "grid h-8 w-8 place-items-center rounded-full text-sm",
                      isActive ? "bg-white/12" : isComplete ? "bg-emerald-500/20 text-emerald-300" : "bg-white/8",
                    )}
                  >
                    {isComplete ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </span>
                  <span className="text-[18px] font-medium">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-auto space-y-5">
          <div className="rounded-[26px] bg-white/6 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">
              Progress
            </p>
            <p className="mt-3 text-3xl font-bold tracking-[-0.04em]">{progressLabel(stepIndex)}</p>
            <div className="mt-5 flex gap-2">
              {steps.map((step, index) => (
                <div
                  className={cn(
                    "h-1.5 flex-1 rounded-full",
                    index <= stepIndex ? "bg-[#f26422]" : "bg-white/10",
                  )}
                  key={step.id}
                />
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/8 bg-white/4 p-5">
            <p className="text-lg font-semibold">User Concierge</p>
            <p className="mt-1 text-sm text-white/60">Support Active</p>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="flex flex-col gap-6 px-6 py-6 md:px-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-[#2f261f]">
            <p className="text-2xl font-bold tracking-[-0.04em]">Business Onboarding</p>
            <div className="hidden h-7 w-px bg-[#e7dad3] md:block" />
            <div className="flex items-center gap-2">
              {steps.map((step, index) => (
                <div
                  className={cn(
                    "h-1.5 w-8 rounded-full",
                    index <= stepIndex ? "bg-[#c64a12]" : "bg-[#e6ddd7]",
                  )}
                  key={step.id}
                />
              ))}
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9a887d]">
              {progressLabel(stepIndex)}
            </p>
          </div>

          <div className="flex items-center gap-4 text-[17px] text-[#5e4f45]">
            <button className="transition-colors hover:text-[#c64a12]" type="button">
              Documentation
            </button>
            <button className="transition-colors hover:text-[#c64a12]" type="button">
              Support
            </button>
            <button className="font-semibold text-[#c64a12]" type="button">
              Save Progress
            </button>
            <button
              aria-label="Help"
              className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm"
              type="button"
            >
              <CircleHelp className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="px-6 pb-12 md:px-10">
          {activeStep === "identity" ? <IdentityStep onNext={nextStep} stepIndex={stepIndex} /> : null}
          {activeStep === "operations" ? (
            <OperationsStep onNext={nextStep} onPrevious={previousStep} />
          ) : null}
          {activeStep === "menu" ? <MenuStep onNext={nextStep} onPrevious={previousStep} /> : null}
          {activeStep === "tables" ? <TablesStep onNext={nextStep} onPrevious={previousStep} /> : null}
          {activeStep === "payments" ? (
            <PaymentsStep onNext={nextStep} onPrevious={previousStep} />
          ) : null}
          {activeStep === "review" ? <ReviewStep onPrevious={previousStep} /> : null}
        </main>
      </div>
    </div>
  );
};

const IdentityStep = ({ onNext, stepIndex }: { onNext: () => void; stepIndex: number }) => (
  <div className="space-y-10">
    <section className="grid gap-10 xl:grid-cols-[1.1fr_0.65fr]">
      <div className="space-y-7">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#c64a12]">
          The Digital Maître D&apos;
        </p>
        <h1 className="max-w-4xl text-5xl font-bold leading-[0.92] tracking-[-0.06em] text-[#171311] md:text-7xl">
          Define your establishment&apos;s{" "}
          <span className="font-serif italic text-[#c64a12]">unique identity.</span>
        </h1>
      </div>

      <p className="max-w-md pt-8 text-[18px] leading-10 text-[#4f4038]">
        Start your journey by detailing the core essentials of your venue. This information shapes
        your brand&apos;s digital presence.
      </p>
    </section>

    <section className="grid gap-6 xl:grid-cols-[0.68fr_1.32fr]">
      <div className="relative overflow-hidden rounded-[28px] bg-[#d7d2cd]">
        <img
          alt="Editorial interior"
          className="h-full min-h-[480px] w-full object-cover opacity-70"
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,12,10,0.03),rgba(16,12,10,0.52))]" />
        <div className="absolute bottom-6 left-6">
          <p className="text-3xl font-semibold tracking-[-0.04em] text-white">Onboarding Phase 01</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.28em] text-white/80">
            Structural Foundation
          </p>
        </div>
      </div>

      <div className="rounded-[30px] bg-[#f4f0ed] p-8 md:p-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {steps.map((step, index) => (
              <div
                className={cn(
                  "h-1.5 w-9 rounded-full",
                  index <= stepIndex ? "bg-[#c64a12]" : "bg-[#e2d2ca]",
                )}
                key={step.id}
              />
            ))}
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#493b34]">
            {progressLabel(stepIndex)}
          </p>
        </div>

        <div className="mt-10 space-y-8">
          <label className="block">
            <span className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#4b3c35]">
              Restaurant Name
            </span>
            <Input
              className="h-16 rounded-2xl border-transparent bg-white px-5 text-lg shadow-none placeholder:text-[#d0c6c0]"
              placeholder="The Glass House"
            />
          </label>

          <label className="block">
            <span className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#4b3c35]">
              Physical Address
            </span>
            <Input
              className="h-16 rounded-2xl border-transparent bg-white px-5 text-lg shadow-none placeholder:text-[#7a6e67]"
              placeholder="124 Editorial Lane, New York, NY"
            />
          </label>

          <div>
            <span className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-[#4b3c35]">
              Cuisine Type
            </span>
            <div className="flex flex-wrap gap-3">
              {cuisineTags.map((tag, index) => (
                <button
                  className={cn(
                    "rounded-2xl px-5 py-3 text-[17px] transition-colors",
                    index === 0
                      ? "bg-[#c64a12] text-white"
                      : "bg-white text-[#4d4039] hover:bg-[#f2e7e1]",
                  )}
                  key={tag}
                  type="button"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-end">
          <Button
            className="h-16 rounded-2xl bg-[#c64a12] px-10 text-xl font-semibold shadow-[0_18px_36px_rgba(198,74,18,0.22)] hover:bg-[#af4110]"
            onClick={onNext}
            size="lg"
            type="button"
          >
            Next: Menu Logic
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  </div>
);

const OperationsStep = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => (
  <div className="space-y-8">
    <section className="max-w-4xl space-y-5 pt-2">
      <h1 className="text-5xl font-bold tracking-[-0.05em] text-[#161210] md:text-6xl">
        Tell us about your business
      </h1>
      <p className="max-w-4xl text-[18px] leading-9 text-[#4f4038]">
        This information helps us verify your establishment and set up your billing profile.
      </p>
    </section>

    <section className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-8">
        <div className="rounded-[30px] bg-[#f4f0ed] p-10">
          <label className="block">
            <span className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#7d675e]">
              Legal Business Name
            </span>
            <Input
              className="h-16 rounded-2xl border-transparent bg-white px-6 text-lg shadow-none placeholder:text-[#d0c6c0]"
              placeholder="e.g. The Gilded Fork Hospitality Group"
            />
          </label>

          <label className="mt-8 block">
            <span className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-[#7d675e]">
              Employer Identification Number (EIN)
              <Bell className="h-4 w-4" />
            </span>
            <Input
              className="h-16 rounded-2xl border-transparent bg-white px-6 text-lg shadow-none placeholder:text-[#d0c6c0]"
              placeholder="00-0000000"
            />
          </label>
        </div>

        <div className="rounded-[30px] bg-[#f4f0ed] p-10">
          <label className="block">
            <span className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#7d675e]">
              Primary Contact Person
            </span>
            <Input
              className="h-16 rounded-2xl border-transparent bg-white px-6 text-lg shadow-none placeholder:text-[#d0c6c0]"
              placeholder="Full Name"
            />
          </label>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#7d675e]">
                Contact Email
              </span>
              <Input
                className="h-16 rounded-2xl border-transparent bg-white px-6 text-lg shadow-none placeholder:text-[#d0c6c0]"
                placeholder="name@restaurant.com"
              />
            </label>

            <label className="block">
              <span className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#7d675e]">
                Phone Number
              </span>
              <Input
                className="h-16 rounded-2xl border-transparent bg-white px-6 text-lg shadow-none placeholder:text-[#d0c6c0]"
                placeholder="+1 (555) 000-0000"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="rounded-[30px] bg-[#b5b1b0] p-8 text-[#171311]">
          <Shield className="h-10 w-10 text-[#c64a12]" />
          <h3 className="mt-10 max-w-xs text-5xl font-bold leading-[1.02] tracking-[-0.05em]">
            Your data is secured by industry standards.
          </h3>
          <p className="mt-6 max-w-sm text-[18px] leading-9 text-[#4b3c34]">
            We use enterprise-grade encryption to protect your business identity and tax
            information.
          </p>
        </div>

        <div className="rounded-[30px] border border-[#ecd9cf] bg-white p-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c64a12]">Need Help?</p>
          <p className="mt-6 text-[19px] italic leading-9 text-[#3a2f29]">
            &quot;The concierge team is standing by to help you with EIN verification.&quot;
          </p>
          <button className="mt-8 border-b border-[#d7c0b3] pb-1 text-lg font-semibold" type="button">
            Chat with a Maître D&apos;
          </button>
        </div>
      </div>
    </section>

    <div className="flex flex-col gap-5 pt-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#c5b2a6]">Coming Up Next</p>
        <p className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-[#1b1512]">
          Kitchen &amp; Service Operations
        </p>
      </div>
      <div className="flex gap-4">
        <Button className="h-16 rounded-2xl px-8" onClick={onPrevious} type="button" variant="outline">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Previous
        </Button>
        <Button
          className="h-16 rounded-2xl bg-[#c64a12] px-10 text-xl font-semibold shadow-[0_18px_36px_rgba(198,74,18,0.22)] hover:bg-[#af4110]"
          onClick={onNext}
          size="lg"
          type="button"
        >
          Continue to Operations
          <ArrowRight className="ml-3 h-5 w-5" />
        </Button>
      </div>
    </div>
  </div>
);

const MenuStep = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => (
  <div className="space-y-10">
    <section className="max-w-4xl space-y-4 pt-2">
      <p className="text-2xl font-semibold tracking-[-0.04em] text-[#1e1815]">Menu Setup</p>
      <h1 className="text-5xl font-bold tracking-[-0.05em] text-[#161210] md:text-6xl">
        Build your menu
      </h1>
      <p className="max-w-4xl text-[18px] leading-9 text-[#4f4038]">
        Organize your offerings into logical categories to help guests navigate your culinary
        journey. Define flavors, pricing, and visual appeal.
      </p>
    </section>

    <section className="space-y-12">
      {menuCategories.map((category) => (
        <div key={category.title}>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#c64a12]">
                {category.section}
              </p>
              <h2 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-[#1b1512]">
                {category.title}
              </h2>
            </div>
            <button className="text-[17px] text-[#4b3c34]" type="button">
              Rename Category
            </button>
          </div>

          <div className="rounded-[28px] bg-[#f4f0ed] p-8">
            <div className="grid gap-6 md:grid-cols-[130px_minmax(0,1fr)]">
              <div className="grid h-32 place-items-center rounded-2xl border border-dashed border-[#dbc8bc] bg-[#f1e7e0] text-center">
                {category.empty ? (
                  <div>
                    <Upload className="mx-auto h-8 w-8 text-[#5c4336]" />
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#3a2b22]">
                      Upload
                    </p>
                  </div>
                ) : (
                  <img
                    alt={category.itemName}
                    className="h-28 w-28 rounded-2xl object-cover"
                    src={category.image}
                  />
                )}
              </div>

              <div className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_240px]">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#4b3c35]">
                      Item Name
                    </span>
                    <Input
                      className="h-14 rounded-2xl border-transparent bg-white px-5 text-lg shadow-none placeholder:text-[#d0c6c0]"
                      placeholder={category.itemName ?? "e.g. Crispy Calamari"}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#4b3c35]">
                      Price ($)
                    </span>
                    <Input
                      className="h-14 rounded-2xl border-transparent bg-white px-5 text-lg shadow-none placeholder:text-[#d0c6c0]"
                      placeholder={category.price ?? "0.00"}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#4b3c35]">
                    Description
                  </span>
                  <textarea
                    className="min-h-[110px] w-full rounded-2xl border border-transparent bg-white px-5 py-4 text-lg text-[#171311] outline-none placeholder:text-[#d0c6c0]"
                    placeholder={
                      category.description ?? "Briefly describe ingredients and preparation..."
                    }
                  />
                </label>
              </div>
            </div>
          </div>

          <button
            className="mt-5 flex h-20 w-full items-center justify-center gap-3 rounded-[24px] border border-dashed border-[#ecd8cb] bg-white/50 text-xl font-medium text-[#422f25]"
            type="button"
          >
            <Plus className="h-5 w-5" />
            Add Item to {category.title}
          </button>
        </div>
      ))}
    </section>

    <div className="flex flex-col items-center gap-8 border-t border-[#ecdfd7] pt-12">
      <button
        className="inline-flex h-16 items-center gap-3 rounded-2xl bg-[#efebe8] px-8 text-xl font-semibold text-[#171311]"
        type="button"
      >
        <Plus className="h-5 w-5" />
        Add New Category
      </button>

      <div className="w-full max-w-xl rounded-[30px] bg-white p-8 text-center shadow-[0_22px_50px_rgba(32,21,15,0.08)]">
        <p className="text-[18px] italic text-[#5f4f46]">
          &quot;The secret of a great menu is balance and rhythm.&quot;
        </p>
        <Button
          className="mt-8 h-16 w-full rounded-2xl bg-[#c64a12] text-xl font-semibold shadow-[0_18px_36px_rgba(198,74,18,0.22)] hover:bg-[#af4110]"
          onClick={onNext}
          size="lg"
          type="button"
        >
          Next: Table Setup
        </Button>
        <p className="mt-5 text-xs font-medium uppercase tracking-[0.3em] text-[#b39d92]">
          Step 3 of 5
        </p>
      </div>

      <Button className="h-14 rounded-2xl px-8" onClick={onPrevious} type="button" variant="outline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Previous Step
      </Button>
    </div>
  </div>
);

const TablesStep = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => (
  <div className="space-y-10">
    <section className="max-w-5xl space-y-4 pt-2">
      <h1 className="text-5xl font-bold tracking-[-0.05em] text-[#161210] md:text-6xl">
        Architect Your Space
      </h1>
      <p className="max-w-5xl text-[18px] leading-9 text-[#4f4038]">
        Define your zones and place your tables. This layout will be the heart of your digital
        floor management.
      </p>
    </section>

    <section className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-8">
        <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
          <div className="rounded-[28px] bg-[#f4f0ed] p-7">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#1f1916]">
                Dining Areas
              </p>
              <button
                className="grid h-10 w-10 place-items-center rounded-full bg-[#c64a12] text-white"
                type="button"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-3 text-[18px]">
              {sectionCards.map((section, index) => (
                <button
                  className={cn(
                    "rounded-2xl px-5 py-4 text-left transition-colors",
                    index === 0 ? "bg-white text-[#b53700] shadow-sm" : "text-[#4b3c34]",
                  )}
                  key={section.title}
                  type="button"
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1b1512]">
                  Main Dining Room
                </h2>
                <p className="mt-1 text-[18px] text-[#5d4d43]">12 Tables • 48 Total Capacity</p>
              </div>
              <div className="flex gap-4">
                <button
                  className="inline-flex h-16 items-center gap-3 rounded-2xl bg-[#efebe8] px-7 text-xl font-medium text-[#161311]"
                  type="button"
                >
                  <Plus className="h-5 w-5" />
                  Add Dining Section
                </button>
                <button
                  className="inline-flex h-16 items-center gap-3 rounded-2xl bg-[#c64a12] px-7 text-xl font-semibold text-white"
                  type="button"
                >
                  <Table2 className="h-5 w-5" />
                  Add Table
                </button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {tableCards.map((table) => (
                <div className="rounded-[24px] bg-white p-7 shadow-sm" key={table.code}>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="rounded-2xl bg-[#f5f0eb] px-5 py-4 text-3xl font-bold text-[#b53700]">
                      {table.code}
                    </span>
                    <div className="flex gap-2">
                      <span className="h-3 w-3 rounded-full bg-[#b53700]" />
                      <span className="h-3 w-3 rounded-full bg-[#b53700]" />
                    </div>
                  </div>
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-[#1b1512]">
                    {table.name}
                  </p>
                  <p className="mt-2 text-[18px] leading-8 text-[#4f4038]">{table.capacity}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {table.tags.map((tag) => (
                      <span
                        className="rounded-xl bg-[#fee5db] px-3 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#5b2c18]"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <button
                className="grid min-h-[280px] place-items-center rounded-[24px] border border-dashed border-[#e7d5ca] bg-white/40 text-center text-2xl font-semibold text-[#92776b]"
                type="button"
              >
                <span>
                  <Plus className="mx-auto mb-5 h-10 w-10" />
                  Add Table
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
          <div className="rounded-[24px] border border-[#efdcd1] bg-white p-8 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-[#fee6db]">
              <Bell className="h-8 w-8 text-[#b53700]" />
            </div>
            <h3 className="mt-8 text-4xl font-semibold tracking-[-0.04em] text-[#171311]">
              Pro Tip
            </h3>
            <p className="mt-5 text-[18px] leading-9 text-[#4f4038]">
              Use naming conventions like &apos;M1&apos;, &apos;M2&apos; for Main Dining to keep staff
              communication crisp.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[30px] bg-[#ece7e2]">
            <img
              alt="Floor map preview"
              className="h-full min-h-[360px] w-full object-cover opacity-28"
              src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1400&q=80"
            />
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-white shadow-md">
                  <LayoutGrid className="h-8 w-8 text-[#b53700]" />
                </div>
                <h3 className="mt-8 text-5xl font-bold tracking-[-0.05em] text-[#161311]">
                  Live Floor Map Preview
                </h3>
                <p className="mx-auto mt-5 max-w-xl text-[18px] leading-9 text-[#4f4038]">
                  Drag and drop your tables to match your physical restaurant layout for more
                  efficient seating.
                </p>
                <button className="mt-8 text-2xl font-semibold text-[#b53700]" type="button">
                  Launch Floor Plan Editor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="flex flex-col gap-6 border-t border-[#ecdfd7] pt-8 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#a99286]">Step 03</p>
        <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#1b1512]">Table Layout</p>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button className="h-16 rounded-2xl px-8" onClick={onPrevious} type="button" variant="outline">
          Previous Step
        </Button>
        <Button
          className="h-16 rounded-2xl bg-[#c64a12] px-10 text-xl font-semibold shadow-[0_18px_36px_rgba(198,74,18,0.22)] hover:bg-[#af4110]"
          onClick={onNext}
          size="lg"
          type="button"
        >
          Continue to Payments
        </Button>
      </div>
    </div>
  </div>
);

const PaymentsStep = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => (
  <div className="space-y-10">
    <section className="space-y-4 pt-2">
      <h1 className="text-5xl font-bold tracking-[-0.05em] text-[#161210] md:text-6xl">
        Configure your payouts
      </h1>
      <p className="max-w-5xl text-[18px] leading-9 text-[#4f4038]">
        Set up your secure financial foundation. We partner with leading financial providers to
        ensure your earnings reach you reliably and safely.
      </p>
    </section>

    <section className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-8">
        <div className="rounded-[28px] bg-[#f4f0ed] p-9">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-5">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#5e5cff] text-white">
                <Banknote className="h-6 w-6" />
              </div>
              <div>
                <p className="text-4xl font-semibold tracking-[-0.04em] text-[#171311]">
                  Connect Bank Account
                </p>
                <p className="mt-2 text-[18px] text-[#5b4a40]">Instant verification via Stripe</p>
              </div>
            </div>
            <span className="rounded-lg bg-[#ebe5e1] px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-[#171311]">
              Recommended
            </span>
          </div>

          <button
            className="mt-8 flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#5b59ff] text-xl font-semibold text-white"
            type="button"
          >
            <CreditCard className="h-5 w-5" />
            Link Account with Stripe
          </button>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-7 text-[#5b4a40]">
            By clicking, you will be redirected to Stripe to securely connect your bank. No login
            details are stored by Editorial Hospitality.
          </p>
        </div>

        <div>
          <div className="mb-7 flex items-center gap-4">
            <p className="text-2xl font-bold uppercase tracking-[0.2em] text-[#c64a12]">Verification</p>
            <div className="h-px flex-1 bg-[#ebddd5]" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#4b3c35]">
                Legal Representative Name
              </span>
              <Input
                className="h-16 rounded-2xl border-transparent bg-[#f4f0ed] px-5 text-lg shadow-none placeholder:text-[#8a95a6]"
                placeholder="e.g. Julianne V. Smith"
              />
            </label>

            <label className="block">
              <span className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#4b3c35]">
                Tax Identification Number (TIN)
              </span>
              <Input
                className="h-16 rounded-2xl border-transparent bg-[#f4f0ed] px-5 text-lg shadow-none placeholder:text-[#8a95a6]"
                placeholder="•••-•••••••"
              />
            </label>
          </div>

          <label className="mt-6 block">
            <span className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#4b3c35]">
              Registered Business Address
            </span>
            <Input
              className="h-28 rounded-2xl border-transparent bg-[#f4f0ed] px-5 text-lg shadow-none placeholder:text-[#8a95a6]"
              placeholder="Street Address, Suite, City, State, Zip"
            />
          </label>
        </div>

        <div>
          <div className="mb-7 flex items-center gap-4">
            <p className="text-2xl font-bold uppercase tracking-[0.2em] text-[#c64a12]">Payout Schedule</p>
            <div className="h-px flex-1 bg-[#ebddd5]" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {payoutSchedules.map((schedule) => (
              <button
                className={cn(
                  "rounded-2xl border p-7 text-left transition-colors",
                  schedule.active
                    ? "border-[#c64a12] bg-white shadow-sm"
                    : "border-transparent bg-[#f4f0ed]",
                )}
                key={schedule.label}
                type="button"
              >
                <p className="text-3xl font-semibold tracking-[-0.04em] text-[#171311]">
                  {schedule.label}
                </p>
                <p className="mt-2 text-[18px] text-[#5b4a40]">{schedule.detail}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-7">
        <div className="rounded-[30px] bg-[#2f2c2b] p-9 text-white">
          <Shield className="h-10 w-10 text-[#ffd7c7]" />
          <h3 className="mt-8 text-5xl font-bold leading-[1.05] tracking-[-0.05em]">
            Enterprise Grade Security
          </h3>
          <p className="mt-6 text-[18px] leading-9 text-white/65">
            We utilize AES-256 encryption for all financial data. Editorial Hospitality never has
            direct access to your full bank account numbers or routing information.
          </p>
          <div className="mt-8 grid gap-4 text-[18px] text-white/80">
            <p>PCI-DSS Level 1 Compliant</p>
            <p>SOC2 Type II Verified</p>
            <p>24/7 Fraud Monitoring</p>
          </div>
        </div>

        <div className="rounded-[28px] bg-[#efebe8] p-8">
          <h4 className="text-3xl font-semibold tracking-[-0.04em] text-[#171311]">
            Need a different provider?
          </h4>
          <p className="mt-5 text-[18px] leading-9 text-[#4f4038]">
            If you require manual wire setup or international settlement in specific currencies,
            please contact our implementation team.
          </p>
          <button className="mt-8 text-2xl font-semibold text-[#c64a12]" type="button">
            Talk to a Payment Specialist
          </button>
        </div>
      </div>
    </section>

    <div className="flex flex-col gap-4 border-t border-[#ecdfd7] pt-8 md:flex-row md:items-center md:justify-between">
      <button className="inline-flex items-center gap-2 text-[18px] text-[#2f261f]" onClick={onPrevious} type="button">
        <ArrowLeft className="h-4 w-4" />
        Previous: Table Setup
      </button>
      <div className="flex gap-4">
        <button className="text-[18px] text-[#2f261f]" type="button">
          Save as Draft
        </button>
        <Button
          className="h-16 rounded-2xl bg-[#c64a12] px-10 text-xl font-semibold shadow-[0_18px_36px_rgba(198,74,18,0.22)] hover:bg-[#af4110]"
          onClick={onNext}
          size="lg"
          type="button"
        >
          Continue to Review
        </Button>
      </div>
    </div>
  </div>
);

const ReviewStep = ({ onPrevious }: { onPrevious: () => void }) => (
  <div className="space-y-10">
    <section className="space-y-5 pt-2">
      <span className="rounded-full bg-[#f9e6dd] px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-[#c64a12]">
        Final Step
      </span>
      <h1 className="text-5xl font-bold tracking-[-0.05em] text-[#161210] md:text-6xl">
        Ready to go live?
      </h1>
      <p className="max-w-4xl text-[18px] leading-9 text-[#4f4038]">
        Everything is prepared for your debut. Review the operational summaries below to ensure
        your digital maître d&apos; is configured exactly to your standards.
      </p>
    </section>

    <section className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-8">
        <div className="rounded-[28px] bg-[#f4f0ed] p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3f342e]">
                Business Identity
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#171311]">
                Verified Information
              </h2>
            </div>
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
          </div>

          <div className="mt-8 grid gap-8 text-[18px] text-[#2b231f] md:grid-cols-2">
            <div className="space-y-8">
              <div>
                <p className="text-sm text-[#84736b]">Legal Name</p>
                <p className="mt-2 font-medium">The Archive Room &amp; Cellar LLC</p>
              </div>
              <div>
                <p className="text-sm text-[#84736b]">Tax ID (EIN)</p>
                <p className="mt-2 font-medium">XX-XXX4920</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-[#84736b]">Address</p>
              <p className="mt-2 font-medium">
                482 Lexington Avenue
                <br />
                Upper East Side, NY 10022
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3f342e]">Menu Preview</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#171311]">
                The Seasonal Collection
              </h2>
            </div>
            <button className="text-[17px] font-semibold text-[#c64a12]" type="button">
              Edit Full Menu
            </button>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c64a12]">Starters</p>
              <div className="mt-4 space-y-5 border-t border-[#efe1d9] pt-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-2xl font-semibold">Burrata &amp; Heirloom Beet</p>
                    <p className="mt-2 text-[16px] italic text-[#7d6c63]">
                      Smoked pine nut, aged balsamic pearls, micro-basil.
                    </p>
                  </div>
                  <span className="text-xl font-medium">$24</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-2xl font-semibold">Cured Scallop Crudo</p>
                    <p className="mt-2 text-[16px] italic text-[#7d6c63]">
                      Yuzu emulsion, serrano, pickled radish.
                    </p>
                  </div>
                  <span className="text-xl font-medium">$28</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c64a12]">Mains</p>
              <div className="mt-4 space-y-5 border-t border-[#efe1d9] pt-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-2xl font-semibold">Dry-Aged Duck Breast</p>
                    <p className="mt-2 text-[16px] italic text-[#7d6c63]">
                      Honey lacquer, parsnip puree, spiced jus.
                    </p>
                  </div>
                  <span className="text-xl font-medium">$48</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-2xl font-semibold">Miso Glazed Black Cod</p>
                    <p className="mt-2 text-[16px] italic text-[#7d6c63]">
                      Wilted bok choy, ginger dashi, crispy leek.
                    </p>
                  </div>
                  <span className="text-xl font-medium">$52</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="rounded-[28px] bg-[linear-gradient(135deg,#262321,#3d2d22)] p-8 text-white">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/60">Financials</p>
          <h3 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Payouts Ready</h3>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/6 p-5">
            <p className="text-2xl font-semibold">Stripe Connected</p>
            <p className="mt-2 text-[16px] text-white/60">Account ending in •••• 8812</p>
          </div>
          <p className="mt-6 text-[17px] leading-8 text-white/70">
            Your payment gateway is live. Funds from reservations and pre-orders will be deposited
            on a T+2 rolling basis.
          </p>
        </div>

        <div className="rounded-[28px] bg-[#f4f0ed] p-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3f342e]">Floor Plan</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#171311]">
            Main Dining Room
          </h3>
          <p className="mt-2 text-[17px] text-[#5b4a40]">12 Tables • 48 Capacity</p>
          <div className="mt-6 rounded-2xl bg-white p-4 text-[16px] text-[#2a241f]">
            Systems operational. All checks passed.
          </div>
          <img
            alt="Floor plan preview"
            className="mt-5 h-36 w-full rounded-2xl object-cover"
            src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80"
          />
        </div>

        <div className="rounded-[28px] border border-[#f0d8ca] bg-[#fff6f2] p-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c64a12]">Support</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#171311]">
            Need a last-minute change?
          </h3>
          <p className="mt-4 text-[17px] leading-8 text-[#5b4a40]">
            Our concierge team is available 24/7 to help you refine your settings post-launch.
          </p>
          <button className="mt-7 text-lg font-semibold text-[#c64a12]" type="button">
            Contact Onboarding Specialist
          </button>
        </div>
      </div>
    </section>

    <section className="border-t border-[#ecdfd7] pt-12 text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-[24px] bg-[#def7ea]">
        <CheckCircle2 className="h-10 w-10 text-emerald-500" />
      </div>
      <h2 className="mt-8 text-5xl font-bold tracking-[-0.05em] text-[#161210]">Ready for Service</h2>
      <p className="mx-auto mt-5 max-w-4xl text-[18px] leading-9 text-[#4f4038]">
        By launching, you acknowledge that your restaurant will be visible to diners and ready to
        accept bookings. You can pause operations at any time from your management dashboard.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4">
        <Button
          className="h-16 rounded-2xl bg-[#c64a12] px-12 text-xl font-semibold shadow-[0_18px_36px_rgba(198,74,18,0.22)] hover:bg-[#af4110]"
          size="lg"
          type="button"
        >
          Finalize &amp; Launch Restaurant
        </Button>
        <p className="text-sm text-[#b19d92]">Estimated activation time: &lt; 5 minutes</p>
      </div>

      <div className="mt-8 flex justify-center">
        <Button className="h-14 rounded-2xl px-8" onClick={onPrevious} type="button" variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous Step
        </Button>
      </div>
    </section>
  </div>
);
