import { Link } from "react-router-dom";

export default function FamilyCard({ family }) {
  const count = family.members?.length ?? 0;
  return (
    <div className="party-card h-100">
      <div className="d-flex align-items-center gap-3">
        <span className="party-card-icon">🏡</span>
        <div className="flex-grow-1 min-w-0">
          <h5 className="party-card-title text-truncate mb-1">
            <Link to={`/family/${family._id}`} className="stretched-link">
              {family.name}
            </Link>
          </h5>
          <span className="party-badge-count">
            👥 {count} member{count === 1 ? "" : "s"}
          </span>
        </div>
      </div>
    </div>
  );
}