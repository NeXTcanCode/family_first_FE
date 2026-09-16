import { useEffect } from "react";

// Requests geolocation once on mount, calls onLocated on success or onError on failure.
export function useGeolocation({ onLocated, onError } = {}) {
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError?.();
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => onLocated?.(position.coords.latitude, position.coords.longitude),
      (err) => onError?.(err)
    );
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);
}