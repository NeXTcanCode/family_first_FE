import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSavedAddresses } from "../api/placesApi.js";

export function useUpdateSavedAddresses() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSavedAddresses,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}
