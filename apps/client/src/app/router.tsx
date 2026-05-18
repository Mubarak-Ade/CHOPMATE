import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { AppShell } from "../components/layout/AppShell";
import { MarketplaceShell } from "../components/layout/MarketplaceShell";
import { MarketingShell } from "../components/layout/MarketingShell";
import { LandingPage } from "../pages/LandingPage";
import { MarketplacePage } from "../pages/MarketplacePage";
import { PartnerOnboardingPage } from "../pages/PartnerOnboardingPage";
import { PartnerRegisterPage } from "../pages/PartnerRegisterPage";
import { RestaurantDetailPage } from "../pages/RestaurantDetailPage";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;
const easeInSoft = [0.4, 0, 1, 1] as const;

const pageTransition = {
  initial: { opacity: 0, y: 18, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(6px)",
    transition: {
      duration: 0.24,
      ease: easeInSoft,
    },
  },
};

const PageFrame = ({ children }: { children: ReactNode }) => (
  <motion.div
    animate="animate"
    exit="exit"
    initial="initial"
    variants={pageTransition}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          element={
            <PageFrame>
              <MarketingShell>
                <LandingPage />
              </MarketingShell>
            </PageFrame>
          }
          path="/"
        />
        <Route
          element={
            <PageFrame>
              <MarketplaceShell>
                <MarketplacePage />
              </MarketplaceShell>
            </PageFrame>
          }
          path="/marketplace"
        />
        <Route
          element={
            <PageFrame>
              <PartnerRegisterPage />
            </PageFrame>
          }
          path="/partners/register"
        />
        <Route
          element={
            <PageFrame>
              <PartnerOnboardingPage />
            </PageFrame>
          }
          path="/partners/onboarding"
        />
        <Route
          element={
            <PageFrame>
              <AppShell>
                <RestaurantDetailPage />
              </AppShell>
            </PageFrame>
          }
          path="/restaurants/:restaurantId"
        />
      </Routes>
    </AnimatePresence>
  );
};

export const AppRouter = () => (
  <BrowserRouter>
    <AnimatedRoutes />
  </BrowserRouter>
);
