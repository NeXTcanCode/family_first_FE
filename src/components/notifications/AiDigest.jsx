import { useFamilyDigest } from "../../hooks/useFamilyDigest.js";
import { timeAgo } from "../../utils/timeAgo.js";

// Shows the AI-generated, viewer-personalized location digest for one family.
export default function AiDigest({ familyId }) {
  const { data, isLoading, isError } = useFamilyDigest(familyId);

  if (isLoading || isError || !data?.digest) return null;

  return (
    <div className="party-card p-3 mb-3">
      <p className="mb-1">{data.digest}</p>
      <div className="text-muted small">Updated {timeAgo(data.computedAt)}</div>
    </div>
  );
}
