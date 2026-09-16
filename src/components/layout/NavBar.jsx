import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Bell } from "lucide-react";
import { useLogoutMutation } from "../../context/authMutations.js";
import { markAllNotificationsReadAction, clearNotificationsAction } from "../../store/store.js";
import { timeAgo } from "../../utils/timeAgo.js";

export default function NavBar() {
  const user = useSelector((s) => s.auth.user);
  const notifications = useSelector((s) => s.notifications.items);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const dispatch = useDispatch();
  const { mutate } = useLogoutMutation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const handleLogout = async () => {
    setOpen(false);
    await mutate();
    navigate("/login");
  };

  const close = () => setOpen(false);

  const toggleNotifications = () => {
    setNotifOpen((v) => {
      const next = !v;
      if (next) dispatch(markAllNotificationsReadAction());
      return next;
    });
  };

  return (
    <header className="floating-navbar-wrapper">
      <div className="navbar-inner">
        <div className="floating-navbar-container">
          {/* <Link to="/" className="brand-pill">
            <Home
              size={18}
              strokeWidth={2.2}
              aria-hidden="true"
              className="me-1"
            />
            Family First
          </Link> */}

          {/* Center Navigation Capsule (≥768px) */}
          <nav className="center-nav-capsule d-none d-md-flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "capsule-link active" : "capsule-link"
              }
              end
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/family/new"
              className={({ isActive }) =>
                isActive ? "capsule-link active" : "capsule-link"
              }
            >
              New Family
            </NavLink>
          </nav>

          {/* Right Action Utilities */}
          <div className="d-flex align-items-center gap-2 position-relative">
            <button
              className="nav-icon-circle"
              title="Notifications"
              type="button"
              onClick={toggleNotifications}
            >
              <Bell size={18} strokeWidth={2.2} aria-hidden="true" />
              {unreadCount > 0 ? <span className="notification-dot" /> : null}
            </button>

            {notifOpen ? (
              <div className="notification-dropdown">
                <div className="notification-dropdown-header">
                  <span>Notifications</span>
                  {notifications.length > 0 ? (
                    <button
                      type="button"
                      className="notification-clear-btn"
                      onClick={() => dispatch(clearNotificationsAction())}
                    >
                      Clear
                    </button>
                  ) : null}
                </div>
                {notifications.length === 0 ? (
                  <div className="notification-empty">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div className="notification-item" key={n.id}>
                      <p className="mb-0">{n.message}</p>
                      <span className="notification-time">
                        {timeAgo(n.timestamp)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            ) : null}

            {user ? (
              <button
                className="btn-logout-pill d-none d-md-inline-flex"
                type="button"
                onClick={handleLogout}
              >
                Log out
              </button>
            ) : null}

            {/* Hamburger (≤768px) */}
            <button
              className="navbar-toggler border-0 shadow-none d-md-none"
              type="button"
              aria-controls="navMobileMenu"
              aria-expanded={open}
              aria-label="Toggle navigation"
              onClick={() => setOpen(!open)}
            >
              <span className="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu (≤768px): only rendered when hamburger is toggled open */}
        {open ? (
          <nav className="mobile-nav-links d-md-none" id="navMobileMenu">
            <NavLink
              to="/"
              onClick={close}
              className={({ isActive }) =>
                isActive ? "capsule-link active" : "capsule-link"
              }
              end
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/family/new"
              onClick={close}
              className={({ isActive }) =>
                isActive ? "capsule-link active" : "capsule-link"
              }
            >
              New Family
            </NavLink>
            {user ? (
              <button
                className="capsule-link mobile-menu-action"
                type="button"
                onClick={handleLogout}
              >
                Log out
              </button>
            ) : null}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
