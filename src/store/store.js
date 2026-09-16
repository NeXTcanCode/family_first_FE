import { configureStore, createSlice } from "@reduxjs/toolkit";

/* ---------- Static auth session state ---------- */
const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: true },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    clearSession(state) {
      state.user = null;
      state.loading = false;
    },
  },
});

/* ---------- Toasts / notifications (client-side temporary state) ---------- */
const notificationSlice = createSlice({
  name: "notifications",
  initialState: { toasts: [], items: [] },
  reducers: {
    pushToast(state, action) {
      state.toasts.push(action.payload);
    },
    popToast(state) {
      state.toasts.shift();
    },
    clearToasts(state) {
      state.toasts = [];
    },
    addNotification(state, action) {
      state.items.unshift({
        id: `${Date.now()}-${Math.random()}`,
        read: false,
        timestamp: Date.now(),
        ...action.payload,
      });
      state.items = state.items.slice(0, 20);
    },
    markAllNotificationsRead(state) {
      state.items.forEach((n) => {
        n.read = true;
      });
    },
  },
});

export const {
  setUser: setUserAction,
  setLoading: setLoadingAction,
  clearSession: clearSessionAction,
} = authSlice.actions;
export const {
  pushToast: pushToastAction,
  popToast: popToastAction,
  clearToasts: clearToastsAction,
  addNotification: addNotificationAction,
  markAllNotificationsRead: markAllNotificationsReadAction,
} = notificationSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notifications: notificationSlice.reducer,
  },
});

export default store;
export { authSlice, notificationSlice };