import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFamily,
  addMember,
  removeMember,
  updateFamily,
  deleteFamily,
  requestToJoin,
  getJoinRequests,
  acceptJoinRequest,
  rejectJoinRequest,
  inviteMember,
  getMyInvites,
  acceptInvite,
  rejectInvite,
  leaveFamily,
} from "../api/familyApi.js";

export function useCreateFamily() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name) => createFamily(name),
    onSuccess: () => qc.resetQueries({ queryKey: ["families"] }),
  });
}

export function useAddMember(familyId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (email) => addMember(familyId, email),
    onSuccess: () => qc.resetQueries({ queryKey: ["families"] }),
  });
}

export function useRemoveMember(familyId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (userId) => removeMember(familyId, userId),
    onSuccess: () => qc.resetQueries({ queryKey: ["families"] }),
  });
}

export function useUpdateFamily(familyId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name) => updateFamily(familyId, name),
    onSuccess: () => qc.resetQueries({ queryKey: ["families"] }),
  });
}

export function useDeleteFamily(familyId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => deleteFamily(familyId),
    onSuccess: () => qc.resetQueries({ queryKey: ["families"] }),
  });
}

export function useRequestToJoin() {
  return useMutation({
    mutationFn: (familyId) => requestToJoin(familyId),
  });
}

export function useJoinRequests(familyId) {
  return useQuery({
    queryKey: ["families", familyId, "join-requests"],
    queryFn: () => getJoinRequests(familyId),
    enabled: Boolean(familyId),
  });
}

export function useAcceptJoinRequest(familyId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (userId) => acceptJoinRequest(familyId, userId),
    onSuccess: () => {
      qc.resetQueries({ queryKey: ["families"] });
      qc.resetQueries({ queryKey: ["families", familyId, "join-requests"] });
    },
  });
}

export function useRejectJoinRequest(familyId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (userId) => rejectJoinRequest(familyId, userId),
    onSuccess: () => qc.resetQueries({ queryKey: ["families", familyId, "join-requests"] }),
  });
}

export function useInviteMember(familyId) {
  return useMutation({
    mutationFn: (email) => inviteMember(familyId, email),
  });
}

export function useMyInvites() {
  return useQuery({
    queryKey: ["invites", "me"],
    queryFn: getMyInvites,
  });
}

export function useAcceptInvite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (familyId) => acceptInvite(familyId),
    onSuccess: () => {
      qc.resetQueries({ queryKey: ["families"] });
      qc.resetQueries({ queryKey: ["invites", "me"] });
    },
  });
}

export function useRejectInvite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (familyId) => rejectInvite(familyId),
    onSuccess: () => qc.resetQueries({ queryKey: ["invites", "me"] }),
  });
}

export function useLeaveFamily(familyId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => leaveFamily(familyId),
    onSuccess: () => qc.resetQueries({ queryKey: ["families"] }),
  });
}