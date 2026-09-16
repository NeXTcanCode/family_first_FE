import { useQuery } from "@tanstack/react-query";
import { getFamilies, getFamily } from "../api/familyApi.js";

export function useFamilies() {
  return useQuery({
    queryKey: ["families"],
    queryFn: getFamilies,
  });
}

export function useFamily(id) {
  return useQuery({
    queryKey: ["families", id],
    queryFn: () => getFamily(id),
    enabled: Boolean(id),
  });
}