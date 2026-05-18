import { FormEvent, useEffect, useState } from "react";
import { MailCheck, RefreshCw } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useAuth } from "../features/auth/hooks/useAuth";

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong. Try again.";

export const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user, verifyEmailMutation, resendVerificationMutation } = useAuth();
  const state = location.state as { verificationToken?: string; email?: string } | null;
  const [token, setToken] = useState(searchParams.get("token") ?? state?.verificationToken ?? "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.isVerified) {
      navigate("/onboarding", { replace: true });
    }
  }, [navigate, user?.isVerified]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await verifyEmailMutation.mutateAsync(token);
      setMessage("Email verified. Taking you to onboarding...");
      navigate("/onboarding", { replace: true });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  };

  const onResend = async () => {
    setError("");
    setMessage("");

    try {
      const result = await resendVerificationMutation.mutateAsync();
      setToken(result.verificationToken ?? "");
      setMessage(
        result.verificationToken
          ? "Verification token refreshed for development."
          : "Verification email sent. Check your inbox.",
      );
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-bg px-5 py-10">
      <main className="w-full max-w-xl rounded-lg border border-border bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="grid size-12 place-items-center rounded-md bg-brand-muted text-brand">
            <MailCheck className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Verify your email</h1>
            <p className="text-sm text-muted-foreground">
              {state?.email ?? user?.email ?? "Your owner account"} must be verified before restaurant setup.
            </p>
          </div>
        </div>

        <form className="grid gap-4" onSubmit={onSubmit}>
          <label className="grid gap-2">
            <span className="text-sm font-medium">Verification token</span>
            <Input
              onChange={(event) => setToken(event.target.value)}
              placeholder="Paste the token from your email"
              required
              value={token}
            />
          </label>

          {message ? <p className="rounded-md bg-success/10 px-4 py-3 text-sm text-success">{message}</p> : null}
          {error ? <p className="rounded-md bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p> : null}

          <Button disabled={verifyEmailMutation.isPending} type="submit">
            {verifyEmailMutation.isPending ? "Verifying..." : "Verify and continue"}
          </Button>
        </form>

        <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            className="inline-flex items-center gap-2 text-sm font-medium text-brand disabled:opacity-50"
            disabled={resendVerificationMutation.isPending}
            onClick={onResend}
            type="button"
          >
            <RefreshCw className="size-4" />
            Resend verification
          </button>
          <Link className="text-sm text-muted-foreground hover:text-brand" to="/partners/register">
            Use a different email
          </Link>
        </div>
      </main>
    </div>
  );
};
