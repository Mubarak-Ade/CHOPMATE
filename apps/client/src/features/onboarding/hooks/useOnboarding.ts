import { useQuery } from "@tanstack/react-query";
import { getOnboardingState } from "../services/onboarding.api";

export const onboardingKeys = {
  state: ["onboarding", "state"] as const,
};

export const useOnboardingState = () =>
  useQuery({
    queryKey: onboardingKeys.state,
    queryFn: getOnboardingState,
    staleTime: 10_000,
  });
