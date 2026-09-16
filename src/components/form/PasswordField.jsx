import { useId, useState } from "react";

export default function PasswordField({ label, value, onChange, minLength, autoComplete, hint }) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <div className="input-group password-field">
        <span className="input-group-text">🔒</span>
        <input
          id={id}
          type={visible ? "text" : "password"}
          className="form-control"
          value={value}
          onChange={onChange}
          required
          minLength={minLength}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          className="btn btn-outline-secondary password-toggle"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          tabIndex={-1}
        >
          {visible ? "🙈" : "👁"}
        </button>
      </div>
      {hint ? <div className="form-hint">{hint}</div> : null}
    </div>
  );
}
