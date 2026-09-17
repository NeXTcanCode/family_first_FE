import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft, Users, Pencil, Check, X, Trash2, List, Map, Copy } from "lucide-react";
import { useFamily } from "../hooks/useFamilies.js";
import {
  useAddMember,
  useRemoveMember,
  useUpdateFamily,
  useDeleteFamily,
} from "../hooks/useFamilyMutations.js";
import MemberList from "../components/family/MemberList.jsx";
import MemberMap from "../components/family/MemberMap.jsx";
import AddMemberForm from "../components/family/AddMemberForm.jsx";
import InviteMemberForm from "../components/family/InviteMemberForm.jsx";
import JoinRequestsPanel from "../components/family/JoinRequestsPanel.jsx";
import LeaveFamilyButton from "../components/family/LeaveFamilyButton.jsx";
import NotificationToast from "../components/notifications/NotificationToast.jsx";
import AiDigest from "../components/notifications/AiDigest.jsx";
import { useNotifications } from "../hooks/useNotifications.js";

export default function FamilyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);
  const { data, isLoading, error } = useFamily(id);
  const { mutate, error: addError, isPending } = useAddMember(id);
  const { mutate: removeMember } = useRemoveMember(id);
  const { mutate: renameFamily, isPending: isRenaming } = useUpdateFamily(id);
  const { mutate: deleteFamilyMutate, isPending: isDeleting } = useDeleteFamily(id);
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [view, setView] = useState("list");
  const [copied, setCopied] = useState(false);
  useNotifications();

  const copyFamilyId = () => {
    navigator.clipboard?.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading…</span>
        </div>
      </div>
    );
  }

  if (error || !data?.family) {
    return (
      <div className="party-card p-4 text-center my-4">
        <p className="text-danger fw-bold mb-3">{error?.message || "Family circle not found."}</p>
        <Link to="/" className="btn-back-pill d-inline-flex">
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    );
  }

  const family = data.family;
  const isCreator = String(family.creator) === String(user?.id);

  return (
    <div className="py-3">
      <NotificationToast />

      {/* Back button pill */}
      <div className="mb-4">
        <Link to="/" className="btn-back-pill">
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="party-card p-4 mb-4">
        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
          <div className="d-flex align-items-center gap-3">
            <div className="party-card-icon">
              <Users size={28} className="text-pink" />
            </div>
            <div>
              {editingName ? (
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={nameDraft}
                    onChange={(e) => setNameDraft(e.target.value)}
                    autoFocus
                  />
                  <button
                    type="button"
                    className="btn-icon-inline text-success"
                    title="Save"
                    disabled={isRenaming || !nameDraft.trim()}
                    onClick={() => {
                      renameFamily(nameDraft.trim());
                      setEditingName(false);
                    }}
                  >
                    <Check size={18} />
                  </button>
                  <button
                    type="button"
                    className="btn-icon-inline text-muted"
                    title="Cancel"
                    onClick={() => setEditingName(false)}
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-2">
                  <h1 className="h3 fw-bold mb-0">{family.name}</h1>
                  {isCreator ? (
                    <button
                      type="button"
                      className="btn-icon-inline text-muted"
                      title="Rename family"
                      onClick={() => {
                        setNameDraft(family.name);
                        setEditingName(true);
                      }}
                    >
                      <Pencil size={16} />
                    </button>
                  ) : null}
                </div>
              )}
              <p className="text-muted small mb-0">
                {family.members?.length ?? 0} member{(family.members?.length ?? 0) === 1 ? "" : "s"} in this circle
              </p>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary mt-2 d-inline-flex align-items-center gap-1"
                onClick={copyFamilyId}
                title="Share this ID so others can request to join"
              >
                <Copy size={14} />
                <span>{copied ? "Copied!" : `Family ID: ${id}`}</span>
              </button>
            </div>
          </div>

          {isCreator ? (
            <button
              type="button"
              className="btn-delete-family"
              disabled={isDeleting}
              onClick={() => {
                if (
                  window.confirm(
                    `Delete "${family.name}"? This removes all members and cannot be undone.`
                  )
                ) {
                  deleteFamilyMutate(undefined, { onSuccess: () => navigate("/") });
                }
              }}
            >
              <Trash2 size={16} />
              <span>{isDeleting ? "Deleting..." : "Delete Family"}</span>
            </button>
          ) : (
            <LeaveFamilyButton familyId={id} familyName={family.name} />
          )}
        </div>
      </div>

      <AiDigest familyId={id} />

      {isCreator ? <JoinRequestsPanel familyId={id} /> : null}

      {/* Main Content Row */}
      <div className="row g-4">
        <div className={isCreator ? "col-12 col-lg-8" : "col-12"}>
          <div className="party-card p-4">
            <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
              <h2 className="h5 fw-bold mb-0">Circle Members</h2>
              <div className="member-view-toggle">
                <button
                  type="button"
                  className={view === "list" ? "active" : ""}
                  onClick={() => setView("list")}
                >
                  <List size={14} />
                  List
                </button>
                <button
                  type="button"
                  className={view === "map" ? "active" : ""}
                  onClick={() => setView("map")}
                >
                  <Map size={14} />
                  Map
                </button>
              </div>
            </div>
            {view === "list" ? (
              <MemberList
                members={family.members}
                isCreator={isCreator}
                creatorId={String(family.creator)}
                onRemove={removeMember}
              />
            ) : (
              <MemberMap members={family.members} />
            )}
          </div>
        </div>

        {isCreator ? (
          <div className="col-12 col-lg-4 d-flex flex-column gap-4">
            <div className="party-card p-4">
              <h2 className="h5 fw-bold mb-2">Add Member</h2>
              <p className="text-muted small mb-3">
                Adds them immediately — no acceptance needed.
              </p>
              <AddMemberForm onAdd={mutate} error={addError?.message} isPending={isPending} />
            </div>
            <div className="party-card p-4">
              <h2 className="h5 fw-bold mb-2">Invite Member</h2>
              <p className="text-muted small mb-3">
                Sends an invite they must accept — you can resend anytime if declined.
              </p>
              <InviteMemberForm familyId={id} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}