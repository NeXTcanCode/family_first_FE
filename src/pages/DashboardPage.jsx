import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { House } from "lucide-react";
import { useFamilies } from "../hooks/useFamilies.js";
import FamilyCard from "../components/family/FamilyCard.jsx";
import LocationUpdater from "../components/location/LocationUpdater.jsx";
import NotificationToast from "../components/notifications/NotificationToast.jsx";
import { useNotifications } from "../hooks/useNotifications.js";

export default function DashboardPage() {
  const user = useSelector((s) => s.auth.user);
  const { data, isLoading } = useFamilies();
  useNotifications(); // subscribes socket → toast + refetch

  return (
    <>
      <NotificationToast />

      {/* Hero Banner Card with Party Vibe */}
      <div className="dashboard-hero-card d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-5">
        <div>
          <h1 className="dashboard-hero-title">Welcome back, {user?.firstName}! 🎉</h1>
          <p className="dashboard-hero-text mb-0">
            Share your live location so your family members stay connected and safe.
          </p>
        </div>
        <div className="location-updater-badge">
          <LocationUpdater />
        </div>
      </div>

      {/* Section Header */}
      <div className="mt-4">
        <div className="party-section-header">
          <h2 className="party-section-title mb-0">Your Family Circles</h2>
          <Link to="/family/new" className="btn-party-action">
            + Create Family
          </Link>
        </div>

        {/* Content State */}
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading…</span>
            </div>
            <p className="text-muted small mt-2 fw-bold">Gathering family circles...</p>
          </div>
        ) : !data || data.families.length === 0 ? (
          <div className="party-empty-state">
            <div className="party-empty-icon">
              <House size={40} strokeWidth={1.6} aria-hidden="true" />
            </div>
            <h3 className="fw-bold mb-2">No family circles yet</h3>
            <p className="text-muted mb-4">Create your first family circle to start sharing locations in real time!</p>
            <Link to="/family/new" className="btn-party-action">
              Create a family circle
            </Link>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {data.families.map((f) => (
              <div className="col" key={f._id}>
                <FamilyCard family={f} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}