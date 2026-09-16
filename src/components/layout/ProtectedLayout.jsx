import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";

// Wraps protected pages needing shared chrome (navbar) + <Outlet/>.
export default function ProtectedLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}