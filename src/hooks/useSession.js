import { useQuery } from "@tanstack/react-query";
import { me as fetchMe } from "../api/authApi.js";

// Fetches current session (API data). Callers decide what to do with the user.
export function useSession() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: fetchMe,
    staleTime: Infinity,
  });
}