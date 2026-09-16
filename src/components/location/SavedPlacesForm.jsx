import { useState } from "react";
import { useSelector } from "react-redux";
import { useGeolocation } from "../../hooks/useGeolocation.js";
import { useUpdateSavedAddresses } from "../../hooks/usePlacesMutations.js";

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

function AddressRow({ label, address, saving, onUseCurrentLocation, error }) {
  return (
    <div className="d-flex align-items-center justify-content-between gap-3 py-2">
      <div>
        <div className="fw-bold">{label}</div>
        {address?.lat != null ? (
          <div className="text-muted small">
            {address.lat.toFixed(4)}, {address.lng.toFixed(4)}
          </div>
        ) : (
          <div className="text-muted small">Not set</div>
        )}
        {error ? <div className="text-danger small">{error}</div> : null}
      </div>
      <button
        type="button"
        className="btn btn-sm btn-outline-primary"
        onClick={onUseCurrentLocation}
        disabled={saving}
      >
        {saving ? "Saving…" : "Use current location"}
      </button>
    </div>
  );
}

// Two fixed slots — Home and Office — each saved from the browser's
// current geolocation, reusing the same useGeolocation hook as LocationUpdater.
export default function SavedPlacesForm() {
  const user = useSelector((s) => s.auth.user);
  const { mutate, isPending } = useUpdateSavedAddresses();
  const [pendingSlot, setPendingSlot] = useState(null);
  const [errors, setErrors] = useState({ home: null, office: null });
  const [retryKey, setRetryKey] = useState(0);

  useGeolocation({
    retryKey,
    onLocated: (lat, lng) => {
      if (!pendingSlot) return;
      setErrors((e) => ({ ...e, [pendingSlot]: null }));
      mutate({ [pendingSlot]: { lat, lng } }, { onSettled: () => setPendingSlot(null) });
    },
    onError: (err) => {
      if (!pendingSlot) return;
      setErrors((e) => ({ ...e, [pendingSlot]: geoErrorMessage(err) }));
      setPendingSlot(null);
    },
  });

  const requestSlot = (slot) => {
    setPendingSlot(slot);
    setRetryKey((k) => k + 1);
  };

  return (
    <div className="party-card p-3">
      <h3 className="h6 fw-bold mb-1">Saved places</h3>
      <p className="text-muted small mb-2">
        Save your home and office so the AI digest can tell your family when you've arrived.
      </p>
      <AddressRow
        label="Home"
        address={user?.homeAddress}
        saving={isPending && pendingSlot === "home"}
        error={errors.home}
        onUseCurrentLocation={() => requestSlot("home")}
      />
      <hr className="my-1" />
      <AddressRow
        label="Office"
        address={user?.officeAddress}
        saving={isPending && pendingSlot === "office"}
        error={errors.office}
        onUseCurrentLocation={() => requestSlot("office")}
      />
    </div>
  );
}
