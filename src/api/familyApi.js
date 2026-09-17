import { get, post, patch, del } from "./client.js";

export const createFamily = (name) => post("/families", { name });
export const getFamilies = () => get("/families");
export const getFamily = (id) => get(`/families/${id}`);
export const getFamilyDigest = (id) => get(`/families/${id}/digest`);
export const addMember = (id, email) =>
  post(`/families/${id}/members`, { email });
export const removeMember = (id, userId) =>
  del(`/families/${id}/members/${userId}`);
export const updateFamily = (id, name) => patch(`/families/${id}`, { name });
export const deleteFamily = (id) => del(`/families/${id}`);
export const requestToJoin = (id) => post(`/families/${id}/join-requests`);
export const getJoinRequests = (id) => get(`/families/${id}/join-requests`);
export const acceptJoinRequest = (id, userId) =>
  post(`/families/${id}/join-requests/${userId}/accept`);
export const rejectJoinRequest = (id, userId) =>
  post(`/families/${id}/join-requests/${userId}/reject`);
export const inviteMember = (id, email) => post(`/families/${id}/invites`, { email });
export const getMyInvites = () => get("/families/me/invites");
export const acceptInvite = (id) => post(`/families/${id}/invites/accept`);
export const rejectInvite = (id) => post(`/families/${id}/invites/reject`);
export const leaveFamily = (id) => del(`/families/${id}/leave`);