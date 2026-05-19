import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, LockKeyhole, Store } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useAuth } from "../features/auth/hooks/useAuth";
import type { User } from "../types/api";

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong. Try again.";

const getPostLoginPath = (user: User | null, fallbackPath?: string) => {
  if (!user) {
    return fallbackPath ?? "/marketplace";
  }

  if ((user.role === "owner" || user.role === "admin") && !user.isVerified) {
    return "/verify-email";
  }

  if ((user.role === "owner" || user.role === "admin") && !user.onboardingCompleted) {
    return "/onboarding";
  }

  if (user.role === "owner" || user.role === "admin") {
    return fallbackPath && fallbackPath !== "/partners/login" ? fallbackPath : "/dashboard";
  }

  return fallbackPath && fallbackPath !== "/partners/login" ? fallbackPath : "/marketplace";
};

export const PartnerLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading, loginMutation } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const fromPath =
    typeof location.state === "object" &&
    location.state !== null &&
    "from" in location.state &&
    typeof location.state.from === "string"
      ? location.state.from
      : undefined;

  useEffect(() => {
    if (!isLoading && user) {
      navigate(getPostLoginPath(user, fromPath), { replace: true });
    }
  }, [fromPath, isLoading, navigate, user]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const session = await loginMutation.mutateAsync(form);
      navigate(getPostLoginPath(session.user, fromPath), { replace: true });
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
            CHOPMATE
          </Link>
          <Link className="text-sm font-medium text-brand" to="/partners/register">
            Create account
          </Link>
        </div>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-82px)] max-w-6xl gap-10 px-5 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <aside className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-muted px-4 py-2 text-sm font-semibold text-brand">
            <Store className="size-4" />
            Restaurant owner access
          </div>
          <div>
            <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              Pick up exactly where setup left off.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-muted-foreground">
              Sign in to verify your email, continue onboarding, publish your restaurant, or manage
              the dashboard once your store is live.
            </p>
          </div>
        </aside>

        <section className="rounded-lg border border-border bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 flex items-center gap-4">
            <div className="grid size-12 place-items-center rounded-md bg-brand-muted text-brand">
              <LockKeyhole className="size-6" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Welcome back</h2>
              <p className="text-sm text-muted-foreground">Use your owner email and password.</p>
            </div>
          </div>

          <form className="grid gap-5" onSubmit={onSubmit}>
            <label className="grid gap-2">
              <span className="text-sm font-medium">Email</span>
              <Input
                autoComplete="email"
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="owner@restaurant.com"
                required
                type="email"
                value={form.email}
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Password</span>
              <Input
                autoComplete="current-password"
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                required
                type="password"
                value={form.password}
              />
            </label>

            {error ? <p className="rounded-md bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p> : null}

            <Button className="h-12 gap-2" disabled={loginMutation.isPending} type="submit">
              {loginMutation.isPending ? "Signing in..." : "Sign in"}
              <ArrowRight className="size-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to CHOPMATE?{" "}
            <Link className="font-semibold text-brand" to="/partners/register">
              Create an owner account
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
};
