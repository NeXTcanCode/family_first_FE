import { get, patch } from "./client.js";

export const lookupByEmail = (email) =>
  get(`/users/lookup?email=${encodeURIComponent(email)}`);
export const updateLocation = (lat, lng) =>
  patch("/users/me/location", { lat, lng });