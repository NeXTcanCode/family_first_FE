import { MapPin, UserMinus } from "lucide-react";

export default function MemberList({ members, isCreator, creatorId, onRemove }) {
  return (
    <div className="d-flex flex-column gap-2">
      {members.map((m) => {
        const initials = `${m.firstName?.[0] ?? ""}${m.lastName?.[0] ?? ""}`.toUpperCase();
        const canRemove = isCreator && creatorId && String(m._id) !== creatorId;
        return (
          <div
            className="d-flex align-items-center justify-content-between p-3 rounded-3 border-0 bg-light-subtle shadow-2-sm"
            key={m._id}
            style={{ background: "#f8fafc", borderRadius: "0.85rem" }}
          >
            <div className="d-flex align-items-center gap-3">
              <span className="user-avatar-chip" style={{ width: "2.5rem", height: "2.5rem", fontSize: "0.9rem" }}>
                {initials || "?"}
              </span>
              <div>
                <h6 className="fw-bold mb-0 text-dark">
                  {m.firstName} {m.lastName}
                </h6>
                <div className="d-flex align-items-center gap-1 text-muted small mt-0.5">
                  <MapPin size={12} />
                  <span>
                    {m.lastLocation
                      ? `${m.lastLocation.lat.toFixed(2)}, ${m.lastLocation.lng.toFixed(2)}`
                      : "No location shared yet"}
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              {m.lastLocation ? <span className="location-badge">Live</span> : null}
              {canRemove ? (
                <button
                  type="button"
                  className="btn-remove-member"
                  title={`Remove ${m.firstName} from this family`}
                  onClick={() => {
                    if (window.confirm(`Remove ${m.firstName} ${m.lastName} from this family?`)) {
                      onRemove(m._id);
                    }
                  }}
                >
                  <UserMinus size={16} />
                </button>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}