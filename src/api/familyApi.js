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