import { createPortal } from "react-dom";

// In-app confirmation modal — replaces window.confirm()'s browser-chrome
// alert with something that matches the app's own styling. Rendered via a
// portal into document.body so it isn't trapped by an ancestor's CSS
// (e.g. a `transform` on a hoverable card creates a new containing block
// that breaks `position: fixed`, confining the overlay to that card instead
// of the viewport).
export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = true,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return createPortal(
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 15, 25, 0.45)",
        zIndex: 1050,
      }}
      onClick={onCancel}
    >
      <div
        className="party-card p-4"
        style={{ maxWidth: "22rem", width: "90%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="h6 fw-bold mb-2">{title}</h3>
        <p className="text-muted small mb-4">{message}</p>
        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`btn btn-sm ${danger ? "btn-danger" : "btn-primary"}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
