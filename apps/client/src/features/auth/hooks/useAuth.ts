import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, login, logout, registerOwner, resendVerification, verifyEmail } from "../services/auth.api";

export const authKeys = {
  me: ["auth", "me"] as const,
};

export const useAuth = () => {
  const queryClient = useQueryClient();

  const meQuery = useQuery({
    queryKey: authKeys.me,
    queryFn: getMe,
    retry: false,
    staleTime: 60_000,
  });

  const invalidateAuth = () => queryClient.invalidateQueries({ queryKey: authKeys.me });

  const registerOwnerMutation = useMutation({
    mutationFn: registerOwner,
    onSuccess: () => invalidateAuth(),
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => invalidateAuth(),
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.me, null);
      queryClient.invalidateQueries({ queryKey: authKeys.me });
    },
  });

  const verifyEmailMutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => invalidateAuth(),
  });

  const resendVerificationMutation = useMutation({
    mutationFn: resendVerification,
    onSuccess: () => invalidateAuth(),
  });

  return {
    user: meQuery.data ?? null,
    isLoading: meQuery.isLoading,
    isAuthenticated: Boolean(meQuery.data),
    registerOwnerMutation,
    loginMutation,
    logoutMutation,
    verifyEmailMutation,
    resendVerificationMutation,
    refetchUser: meQuery.refetch,
  };
};
