import {
  useJoinRequests,
  useAcceptJoinRequest,
  useRejectJoinRequest,
} from "../../hooks/useFamilyMutations.js";

// Creator-only panel: lists pending join requests for a family with
// Accept/Reject actions, reusing the existing member/family query patterns.
export default function JoinRequestsPanel({ familyId }) {
  const { data, isLoading } = useJoinRequests(familyId);
  const { mutate: accept, isPending: accepting } = useAcceptJoinRequest(familyId);
  const { mutate: reject, isPending: rejecting } = useRejectJoinRequest(familyId);

  const requests = data?.joinRequests ?? [];
  if (isLoading || requests.length === 0) return null;

  return (
    <div className="party-card p-4 mb-4">
      <h2 className="h5 fw-bold mb-3">Join Requests</h2>
      <ul className="list-unstyled mb-0">
        {requests.map((r) => (
          <li
            key={r.user._id}
            className="d-flex align-items-center justify-content-between gap-3 py-2 border-bottom"
          >
            <div>
              <div className="fw-bold">
                {r.user.firstName} {r.user.lastName}
              </div>
              <div className="text-muted small">{r.user.email}</div>
            </div>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-success"
                disabled={accepting || rejecting}
                onClick={() => accept(r.user._id)}
              >
                Accept
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                disabled={accepting || rejecting}
                onClick={() => reject(r.user._id)}
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
