import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../context/authMutations.js";

export default function SignupPage() {
  const navigate = useNavigate();
  const { mutateAsync, error, isPending } = useSignupMutation();
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync(form);
      navigate("/");
    } catch {
      // error surfaced in hook
    }
  };

  return (
    <div className="auth-split-wrapper">
      <div className="auth-split-card">
        {/* Left Side Form */}
        <div className="auth-left-panel">
          <div className="auth-form-container">
            <h1 className="auth-hero-heading">
              Join the
              <br />
              family
            </h1>
            <p className="auth-hero-subhead">
              Create your account to join the portal
            </p>

            <form onSubmit={submit} noValidate>
              {/* First Name */}
              <div className="badge-input-group">
                <span className="badge-label">FIRST</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={set("firstName")}
                  autoComplete="given-name"
                  autoFocus
                  required
                />
              </div>

              {/* Middle Name */}
              <div className="badge-input-group">
                <span className="badge-label">MIDDLE</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Middle name (optional)"
                  value={form.middleName}
                  onChange={set("middleName")}
                  autoComplete="additional-name"
                />
              </div>

              {/* Last Name */}
              <div className="badge-input-group">
                <span className="badge-label">LAST</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={set("lastName")}
                  autoComplete="family-name"
                  required
                />
              </div>

              {/* Email */}
              <div className="badge-input-group">
                <span className="badge-label">EMAIL</span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email address"
                  value={form.email}
                  onChange={set("email")}
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password */}
              <div className="badge-input-group badge-password-group">
                <span className="badge-label">PASSWORD</span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Min 8 characters"
                  value={form.password}
                  onChange={set("password")}
                  minLength={8}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>

              {error?.message ? (
                <div
                  className="alert alert-danger py-2 mt-3"
                  role="alert"
                  aria-live="polite"
                >
                  {error.message}
                </div>
              ) : null}

              {/* Actions */}
              <div className="auth-actions">
                <Link to="/login" className="btn-party-signup">
                  LOG IN
                </Link>
                <button
                  type="submit"
                  className="btn-party-login"
                  disabled={isPending}
                >
                  {isPending ? "SIGNING UP..." : "SIGN UP"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side Illustration */}
        <div className="auth-right-panel" />
      </div>
    </div>
  );
}
