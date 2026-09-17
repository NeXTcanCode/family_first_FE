import { useState } from "react";
import { Mail } from "lucide-react";
import { useInviteMember } from "../../hooks/useFamilyMutations.js";

// Creator sends an invite by email; the invited user must accept it
// themselves (see MyInvitesPanel) — unlike AddMemberForm, which adds
// directly without the other person's consent.
export default function InviteMemberForm({ familyId }) {
  const [email, setEmail] = useState("");
  const { mutate, isPending, isSuccess, error } = useInviteMember(familyId);

  const submit = (e) => {
    e.preventDefault();
    mutate(email, { onSuccess: () => setEmail("") });
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
      {isSuccess ? <div className="text-success small mb-3">Invite sent.</div> : null}
      {error ? <div className="text-danger small mb-3">{error.message}</div> : null}
      <button className="btn-party-action w-100 border-0 py-2.5" disabled={isPending}>
        {isPending ? (
          "Inviting..."
        ) : (
          <span className="d-flex align-items-center justify-content-center gap-2">
            <Mail size={16} />
            <span>Send Invite</span>
          </span>
        )}
      </button>
    </form>
  );
}
