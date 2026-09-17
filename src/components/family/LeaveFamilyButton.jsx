import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useLeaveFamily } from "../../hooks/useFamilyMutations.js";
import ConfirmDialog from "../common/ConfirmDialog.jsx";

// Non-creator members can leave a family at any time. The creator can't
// leave (must delete the family instead) — enforced server-side too.
export default function LeaveFamilyButton({ familyId, familyName }) {
  const navigate = useNavigate();
  const { mutate, isPending } = useLeaveFamily(familyId);
  const [confirming, setConfirming] = useState(false);

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-danger d-inline-flex align-items-center gap-2"
        disabled={isPending}
        onClick={() => setConfirming(true)}
      >
        <LogOut size={16} />
        <span>{isPending ? "Leaving..." : "Leave Family"}</span>
      </button>
      <ConfirmDialog
        open={confirming}
        title="Leave this family?"
        message={`Leave "${familyName}"? You'll need to be re-invited to rejoin.`}
        confirmLabel="Leave"
        onCancel={() => setConfirming(false)}
        onConfirm={() => {
          setConfirming(false);
          mutate(undefined, { onSuccess: () => navigate("/") });
        }}
      />
    </>
  );
}
