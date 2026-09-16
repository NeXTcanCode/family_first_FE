import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ArrowLeft, Users, PlusCircle } from "lucide-react";
import { useCreateFamily } from "../hooks/useFamilyMutations.js";
import { pushToastAction, addNotificationAction } from "../store/store.js";

export default function FamilyCreatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutateAsync, error, isPending } = useCreateFamily();
  const [name, setName] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateAsync(name);
      const message = `"${data.family.name}" family circle created!`;
      dispatch(pushToastAction(message));
      dispatch(addNotificationAction({ message }));
      navigate(`/family/${data.family._id}`);
    } catch {
      // error surfaced via hook
    }
  };

  return (
    <div className="py-4">
      {/* Back to dashboard button pill */}
      <div className="mb-4">
        <Link to="/" className="btn-back-pill">
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="party-card p-4 p-md-5">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="party-card-icon">
                <Users size={28} className="text-pink" />
              </div>
              <div>
                <h1 className="h3 fw-bold mb-0">Create a Family Circle</h1>
                <p className="text-muted small mb-0">
                  Form your private circle to share live locations and stay connected.
                </p>
              </div>
            </div>

            <hr className="my-4 opacity-10" />

            <form onSubmit={submit}>
              {/* Badge label input (matching Login/Signup style) */}
              <div className="badge-input-group mb-4">
                <span className="badge-label">FAMILY NAME</span>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. The Smith Circle"
                  required
                  autoFocus
                />
              </div>

              {error?.message ? (
                <div className="alert alert-danger py-2 mb-4" role="alert">
                  {error.message}
                </div>
              ) : null}

              <button className="btn-party-action w-100 py-3 border-0" disabled={isPending}>
                {isPending ? (
                  "Creating Circle..."
                ) : (
                  <span className="d-flex align-items-center justify-content-center gap-2">
                    <PlusCircle size={18} />
                    <span>Create Family Circle</span>
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}