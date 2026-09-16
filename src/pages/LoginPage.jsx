import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../context/authMutations.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const { mutateAsync, error, isPending } = useLoginMutation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync(form);
      navigate("/");
    } catch {
      // handled in hook
    }
  };

  return (
    <div className="auth-split-wrapper">
      <div className="auth-split-card">
        {/* Left Side Form */}
        <div className="auth-left-panel">
          <div className="auth-form-container">
            <h1 className="auth-hero-heading">
              Welcome
              <br />
              to the family
            </h1>
            {/* <p className="auth-hero-subhead">Log in to your favorite party portal</p> */}

            <form onSubmit={submit} noValidate>
              {/* Email field with pink label badge */}
              <div className="badge-input-group">
                <span className="badge-label">LOGIN</span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Type your login (email)"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  autoComplete="email"
                  autoFocus
                  required
                />
              </div>

              {/* Password field with pink label badge */}
              <div className="badge-input-group badge-password-group">
                <span className="badge-label">PASSWORD</span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  autoComplete="current-password"
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

              {/* Forgot password — not implemented yet, commented out
              <a href="#forgot" onClick={(e) => e.preventDefault()} className="auth-forgot-link">
                Forget password?
              </a>
              */}

              {error?.message ? (
                <div
                  className="alert alert-danger py-2 mt-3"
                  role="alert"
                  aria-live="polite"
                >
                  {error.message}
                </div>
              ) : null}

              {/* Action Buttons */}
              <div className="auth-actions">
                <Link to="/signup" className="btn-party-signup">
                  SIGN UP
                </Link>
                <button
                  type="submit"
                  className="btn-party-login"
                  disabled={isPending}
                >
                  {isPending ? "LOGGING IN..." : "LOGIN"}
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
