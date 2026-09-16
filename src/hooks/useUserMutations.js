import { useMutation } from "@tanstack/react-query";
import { updateLocation } from "../api/userApi.js";

export function useUpdateLocation() {
  return useMutation({
    mutationFn: ({ lat, lng }) => updateLocation(lat, lng),
  });
}