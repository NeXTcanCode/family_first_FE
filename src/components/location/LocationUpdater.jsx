import { useState } from "react";
import { useGeolocation } from "../../hooks/useGeolocation.js";
import { useUpdateLocation } from "../../hooks/useUserMutations.js";

// GeolocationPositionError codes: 1 = PERMISSION_DENIED, 2 = POSITION_UNAVAILABLE, 3 = TIMEOUT.
function geoErrorMessage(err) {
  switch (err?.code) {
    case 1:
      return "Location access denied — allow it in your browser's site settings.";
    case 2:
      return "Couldn't determine your location — check GPS/location services are on.";
    case 3:
      return "Location request timed out.";
    default:
      return "Your browser doesn't support location sharing.";
  }
}

// Geolocates on mount and whenever the badge is clicked; posts via TanStack mutation.
export default function LocationUpdater() {
  const { mutate, isPending, isSuccess, isError } = useUpdateLocation();
  const [geoError, setGeoError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);
  const located = (lat, lng) => {
    setGeoError(null);
    mutate({ lat, lng });
  };
  useGeolocation({ onLocated: located, onError: setGeoError, retryKey });

  const refresh = () => {
    setGeoError(null);
    setRetryKey((k) => k + 1);
  };

  let label;
  if (geoError) label = geoErrorMessage(geoError);
  else if (isError) label = "Couldn't share location. Tap to retry.";
  else if (isPending) label = "Sharing location…";
  else if (isSuccess) label = "Location shared — tap to refresh";
  else label = "Getting your location…";

  const busy = isPending;

  return (
    <button
      type="button"
      className="location-status-btn"
      onClick={refresh}
      disabled={busy}
      title="Click to update your shared location"
    >
      <span>{label}</span>
      {!busy ? <span aria-hidden="true">⟳</span> : null}
    </button>
  );
}