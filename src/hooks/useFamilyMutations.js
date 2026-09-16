import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createFamily,
  addMember,
  removeMember,
  updateFamily,
  deleteFamily,
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