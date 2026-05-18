import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, Store, UtensilsCrossed } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useAuth } from "../features/auth/hooks/useAuth";

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong. Try again.";

export const PartnerRegisterPage = () => {
  const navigate = useNavigate();
  const { registerOwnerMutation } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [verificationToken, setVerificationToken] = useState<string | null>(null);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const session = await registerOwnerMutation.mutateAsync({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });
      setVerificationToken(session.verificationToken ?? null);
      navigate("/verify-email", {
        state: { verificationToken: session.verificationToken, email: session.user?.email },
      });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  };

  return (
    <div className="min-h-screen bg-bg text-foreground">
      <header className="border-b border-border/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <Link className="flex items-center gap-3 font-semibold" to="/">
            <span className="grid size-10 place-items-center rounded-md bg-brand text-white">CM</span>
            Chopmate Partners
          </Link>
          <Link className="text-sm font-medium text-brand" to="/marketplace">
            Browse marketplace
          </Link>
        </div>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-82px)] max-w-6xl gap-10 px-5 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <aside className="space-y-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
              Restaurant onboarding
            </p>
            <h1 className="mt-4 max-w-xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              Start selling without landing in an empty dashboard.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-muted-foreground">
              Create your owner account first. After email verification, Chopmate guides you through
              business setup, branding, menu, delivery, preview, and publish.
            </p>
          </div>

          <div className="grid gap-3 text-sm">
            {["Verify account", "Create restaurant draft", "Add first menu item", "Publish when ready"].map(
              (item) => (
                <div className="flex items-center gap-3 rounded-md bg-white px-4 py-3 shadow-sm" key={item}>
                  <CheckCircle2 className="size-5 text-success" />
                  <span className="font-medium">{item}</span>
                </div>
              ),
            )}
          </div>
        </aside>

        <section className="rounded-lg border border-border bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 flex items-center gap-4">
            <div className="grid size-12 place-items-center rounded-md bg-brand-muted text-brand">
              <Store className="size-6" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Owner account</h2>
              <p className="text-sm text-muted-foreground">Use the same login for onboarding and dashboard.</p>
            </div>
          </div>

          <form className="grid gap-5" onSubmit={onSubmit}>
            <label className="grid gap-2">
              <span className="text-sm font-medium">Full name</span>
              <Input
                autoComplete="name"
                onChange={(event) => updateField("fullName", event.target.value)}
                placeholder="Ada Okafor"
                required
                value={form.fullName}
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium">Email</span>
              <Input
                autoComplete="email"
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="owner@restaurant.com"
                required
                type="email"
                value={form.email}
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium">Password</span>
              <Input
                autoComplete="new-password"
                minLength={8}
                onChange={(event) => updateField("password", event.target.value)}
                required
                type="password"
                value={form.password}
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium">Confirm password</span>
              <Input
                autoComplete="new-password"
                minLength={8}
                onChange={(event) => updateField("confirmPassword", event.target.value)}
                required
                type="password"
                value={form.confirmPassword}
              />
            </label>

            {error ? <p className="rounded-md bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p> : null}
            {verificationToken ? (
              <p className="rounded-md bg-brand-muted px-4 py-3 text-sm text-brand">
                Dev verification token: {verificationToken}
              </p>
            ) : null}

            <Button className="h-12 gap-2" disabled={registerOwnerMutation.isPending} type="submit">
              {registerOwnerMutation.isPending ? "Creating account..." : "Create account"}
              <ArrowRight className="size-4" />
            </Button>
          </form>

          <div className="mt-8 flex items-center gap-3 rounded-md bg-muted p-4 text-sm text-muted-foreground">
            <UtensilsCrossed className="size-5 text-brand" />
            Restaurant creation happens after verification, keeping abandoned signups out of your restaurant data.
          </div>
        </section>
      </main>
    </div>
  );
};
