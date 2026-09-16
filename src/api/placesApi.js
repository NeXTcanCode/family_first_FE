import { patch } from "./client.js";

export const updateSavedAddresses = ({ home, office }) =>
  patch("/users/me/addresses", { home, office });
