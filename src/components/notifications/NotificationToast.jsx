import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { popToastAction } from "../../store/store.js";

const TOAST_TIMEOUT_MS = 5000;

// Renders toasts read from Redux notifications state.
export default function NotificationToast() {
  const toasts = useSelector((s) => s.notifications.toasts);
  const dispatch = useDispatch();
  const prevLengthRef = useRef(0);

  useEffect(() => {
    const added = toasts.length - prevLengthRef.current;
    prevLengthRef.current = toasts.length;
    if (added <= 0) return;

    const timers = Array.from({ length: added }, () =>
      setTimeout(() => dispatch(popToastAction()), TOAST_TIMEOUT_MS)
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts.length, dispatch]);

  return (
    <div className="toast-container notification-toast-container position-fixed bottom-0 end-0 p-3">
      {toasts.map((toast, i) => (
        <div className="toast show" role="alert" key={`${toast}-${i}`}>
          <div className="toast-header">
            <strong className="me-auto">Family First</strong>
            <button
              type="button"
              className="btn-close"
              onClick={() => dispatch(popToastAction())}
            ></button>
          </div>
          <div className="toast-body">{toast}</div>
        </div>
      ))}
    </div>
  );
}