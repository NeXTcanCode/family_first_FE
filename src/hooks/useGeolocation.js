import { useEffect } from "react";

// Requests geolocation on mount (and again whenever `retryKey` changes),
// calls onLocated on success or onError(err) on failure.
export function useGeolocation({ onLocated, onError, retryKey = 0 } = {}) {
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
  }, [retryKey]);
}