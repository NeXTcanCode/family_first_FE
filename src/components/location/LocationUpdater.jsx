import { useState } from "react";
import { useGeolocation } from "../../hooks/useGeolocation.js";
import { useUpdateLocation } from "../../hooks/useUserMutations.js";

// Geolocates once on mount, posts via TanStack mutation, shows status.
export default function LocationUpdater() {
  const { mutate, isPending, isSuccess, isError } = useUpdateLocation();
  const [geoError, setGeoError] = useState(false);
  const located = (lat, lng) => mutate({ lat, lng });
  useGeolocation({ onLocated: located, onError: () => setGeoError(true) });

  if (isSuccess) return null;
  if (isError) return <p className="location-status">Couldn&rsquo;t share location.</p>;
  if (geoError) {
    return (
      <p className="location-status">
        Location access denied — enable it in your browser settings.
      </p>
    );
  }
  if (isPending) return <p className="location-status">Sharing location…</p>;
  return <p className="location-status">Getting your location…</p>;
}