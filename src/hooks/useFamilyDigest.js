import { useQuery } from "@tanstack/react-query";
import { getFamilyDigest } from "../api/familyApi.js";

// Polls rather than pushing over the socket — matches the backend's
// TTL+invalidation cache so this never calls the LLM on every location ping.
export function useFamilyDigest(familyId) {
  return useQuery({
    queryKey: ["families", familyId, "digest"],
    queryFn: () => getFamilyDigest(familyId),
    enabled: Boolean(familyId),
    refetchInterval: 90_000,
  });
}
