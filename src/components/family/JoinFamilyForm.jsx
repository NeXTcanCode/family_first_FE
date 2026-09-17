import { useState } from "react";
import { useRequestToJoin } from "../../hooks/useFamilyMutations.js";

// Any logged-in user can request to join a family by its ID —
// the creator accepts/rejects from JoinRequestsPanel on FamilyPage.
export default function JoinFamilyForm() {
  const [familyId, setFamilyId] = useState("");
  const { mutate, isPending, isSuccess, error } = useRequestToJoin();

  const submit = (e) => {
    e.preventDefault();
    mutate(familyId.trim(), { onSuccess: () => setFamilyId("") });
  };

  return (
    <form onSubmit={submit} className="d-flex flex-column flex-sm-row gap-2">
      <input
        type="text"
        className="form-control"
        placeholder="Paste a family ID to join"
        value={familyId}
        onChange={(e) => setFamilyId(e.target.value)}
        required
      />
      <button className="btn-party-action" disabled={isPending || !familyId.trim()}>
        {isPending ? "Requesting…" : "Request to join"}
      </button>
      {isSuccess ? <div className="text-success small">Request sent — waiting for approval.</div> : null}
      {error ? <div className="text-danger small">{error.message}</div> : null}
    </form>
  );
}
