import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login, signup, logout } from "../api/authApi.js";
import { setUserAction, clearSessionAction } from "../store/store.js";

function useAuthMutation(mutationFn, onSuccess) {
  const dispatch = useDispatch();
  const qc = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      dispatch(onSuccess(data));
      qc.resetQueries({ queryKey: ["auth"] });
    },
    onError: () => {
      dispatch(clearSessionAction());
    },
  });
}

export function useLoginMutation() {
  return useAuthMutation(login, (data) => setUserAction(data.user));
}

export function useSignupMutation() {
  return useAuthMutation(signup, (data) => setUserAction(data.user));
}

export function useLogoutMutation() {
  return useAuthMutation(logout, () => clearSessionAction());
}