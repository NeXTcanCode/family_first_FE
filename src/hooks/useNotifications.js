import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { useSocket } from "./useSocket.js";
import { useDispatch, useSelector } from "react-redux";
import { pushToastAction, addNotificationAction } from "../store/store.js";

// Real-time socket events: show a Redux toast + persisted notification, and refetch families so lists stay live.
export function useNotifications() {
  const dispatch = useDispatch();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUserId = useSelector((s) => s.auth.user?.id);

  const notify = useCallback(
    (message) => {
      dispatch(pushToastAction(message));
      dispatch(addNotificationAction({ message }));
    },
    [dispatch]
  );

  const isViewingFamily = useCallback(
    (familyId) => location.pathname === `/family/${familyId}`,
    [location.pathname]
  );

  const handleEvent = useCallback((name, payload) => {
    if (name === "member:added" && payload?.member) {
      notify(`${payload.member.firstName} ${payload.member.lastName} was added to a family.`);
    } else if (name === "location:updated") {
      // Don't notify a user about their own location update.
      if (String(payload?.userId) !== String(currentUserId)) {
        const who = payload?.firstName
          ? `${payload.firstName} ${payload.lastName ?? ""}`.trim()
          : "A family member";
        notify(`${who} updated their location.`);
      }
    } else if (name === "member:removed") {
      if (String(payload?.userId) === String(currentUserId)) {
        notify("You were removed from a family.");
        if (isViewingFamily(payload?.familyId)) navigate("/");
      }
    } else if (name === "family:deleted") {
      notify("A family circle was deleted.");
      if (isViewingFamily(payload?.familyId)) navigate("/");
    } else if (name === "join:requested") {
      notify(`Someone wants to join "${payload?.familyName ?? "your family"}".`);
    } else if (name === "join:rejected") {
      notify(`Your request to join "${payload?.familyName ?? "a family"}" was declined.`);
    } else if (name === "invite:received") {
      notify(`You've been invited to join "${payload?.familyName ?? "a family"}".`);
    } else if (name === "invite:rejected") {
      notify(`Your invite to join "${payload?.familyName ?? "your family"}" was declined.`);
    }
    qc.resetQueries({ queryKey: ["families"] });
    if (name === "invite:received" || name === "invite:rejected") {
      qc.resetQueries({ queryKey: ["invites", "me"] });
    }
  }, [notify, qc, currentUserId, isViewingFamily, navigate]);

  useSocket({ onEvent: handleEvent });
}