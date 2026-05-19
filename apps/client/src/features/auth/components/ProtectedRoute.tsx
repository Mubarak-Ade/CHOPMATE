import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  requireVerified?: boolean;
  requireOnboardingIncomplete?: boolean;
  requireOnboardingComplete?: boolean;
  ownerOnly?: boolean;
}

export const ProtectedRoute = ({
  requireVerified = false,
  requireOnboardingIncomplete = false,
  requireOnboardingComplete = false,
  ownerOnly = false,
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <p className="text-sm text-muted-foreground">Loading your session...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate replace state={{ from: location.pathname }} to="/partners/login" />;
  }

  if (ownerOnly && user.role !== "owner" && user.role !== "admin") {
    return <Navigate replace to="/" />;
  }

  if (requireVerified && !user.isVerified) {
    return <Navigate replace to="/verify-email" />;
  }

  if (requireOnboardingIncomplete && user.onboardingCompleted) {
    return <Navigate replace to="/dashboard" />;
  }

  if (requireOnboardingComplete && !user.onboardingCompleted) {
    return <Navigate replace to="/onboarding" />;
  }

  return <Outlet />;
};
