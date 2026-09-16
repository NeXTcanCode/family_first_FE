import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { MapPin } from "lucide-react";
import { timeAgo } from "../../utils/timeAgo.js";

function initialsOf(m) {
  return `${m.firstName?.[0] ?? ""}${m.lastName?.[0] ?? ""}`.toUpperCase() || "?";
}

function memberIcon(m) {
  return L.divIcon({
    html: `<div class="user-avatar-chip map-marker-pin">${initialsOf(m)}</div>`,
    className: "",
    iconSize: [40, 46],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
}

function FitBounds({ points }) {
  const map = useMap();
  useMemo(() => {
    if (points.length === 1) {
      map.setView(points[0], 13);
    } else if (points.length > 1) {
      map.fitBounds(points, { padding: [40, 40] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points.map((p) => p.join(",")).join("|")]);
  return null;
}

export default function MemberMap({ members }) {
  const located = members.filter((m) => m.lastLocation);
  const points = located.map((m) => [m.lastLocation.lat, m.lastLocation.lng]);

  if (located.length === 0) {
    return (
      <div className="member-map-empty">
        <MapPin size={28} className="mb-2" />
        <p className="mb-0">No one has shared their location yet.</p>
      </div>
    );
  }

  return (
    <div className="member-map-container">
      <MapContainer center={points[0]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={points} />
        {located.map((m) => (
          <Marker key={m._id} position={[m.lastLocation.lat, m.lastLocation.lng]} icon={memberIcon(m)}>
            <Popup>
              <div className="map-popup-title">
                {m.firstName} {m.lastName}
              </div>
              <div className="map-popup-time">Updated {timeAgo(m.locationUpdatedAt)}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
