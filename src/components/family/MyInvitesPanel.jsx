import {
  useMyInvites,
  useAcceptInvite,
  useRejectInvite,
} from "../../hooks/useFamilyMutations.js";

// Shows the current user's own pending invites (creator-initiated) with
// Accept/Reject actions — the mirror image of JoinRequestsPanel.
export default function MyInvitesPanel() {
  const { data, isLoading } = useMyInvites();
  const { mutate: accept, isPending: accepting } = useAcceptInvite();
  const { mutate: reject, isPending: rejecting } = useRejectInvite();

  const invites = data?.invites ?? [];
  if (isLoading || invites.length === 0) return null;

  return (
    <div className="party-card p-3 mb-4">
      <h3 className="h6 fw-bold mb-2">Family Invites</h3>
      <ul className="list-unstyled mb-0">
        {invites.map((inv) => (
          <li
            key={inv.familyId}
            className="d-flex align-items-center justify-content-between gap-3 py-2 border-bottom"
          >
            <div>
              <div className="fw-bold">{inv.familyName}</div>
              <div className="text-muted small">
                Invited by {inv.creator.firstName} {inv.creator.lastName}
              </div>
            </div>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-success"
                disabled={accepting || rejecting}
                onClick={() => accept(inv.familyId)}
              >
                Accept
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                disabled={accepting || rejecting}
                onClick={() => reject(inv.familyId)}
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
