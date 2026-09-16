// Typed-ish accessors for store slices.
import store from "./store.js";

export const selectUser = () => store.getState().auth.user;
export const selectAuthLoading = () => store.getState().auth.loading;
export const selectToasts = () => store.getState().notifications.toasts;