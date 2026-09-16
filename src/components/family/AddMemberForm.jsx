import { useState } from "react";
import { UserPlus } from "lucide-react";

export default function AddMemberForm({ onAdd, error, isPending }) {
  const [email, setEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await onAdd(email);
    setEmail("");
  };

  return (
    <form onSubmit={submit}>
      <div className="badge-input-group mb-3">
        <span className="badge-label">EMAIL</span>
        <input
          type="email"
          className="form-control"
          placeholder="member@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {error ? <div className="text-danger small mb-3">{error}</div> : null}

      <button className="btn-party-action w-100 border-0 py-2.5" disabled={isPending}>
        {isPending ? (
          "Adding..."
        ) : (
          <span className="d-flex align-items-center justify-content-center gap-2">
            <UserPlus size={16} />
            <span>Add Member</span>
          </span>
        )}
      </button>
    </form>
  );
}