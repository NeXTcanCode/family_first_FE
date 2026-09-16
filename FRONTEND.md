# Frontend — Family Comes First

Vite + React 19 SPA. Mobile-first, built on the Bootstrap 5 + jQuery CDN already linked in `index.html`. No CSS frameworks added via npm — Bootstrap classes handle layout, custom rules live in `public/style.css`.

## Folder structure

```
frontend/src/
  main.jsx                  # BrowserRouter + AuthProvider wrap <App/>
  App.jsx                   # <Routes> definitions
  api/
    client.js               # fetch wrapper: base URL, credentials:'include', JSON helpers, error normalization
    authApi.js               # signup, login, logout, me
    familyApi.js              # createFamily, getFamilies, getFamily, addMember
    userApi.js                # lookupByEmail, updateLocation
  context/
    AuthContext.jsx          # { user, loading, login, signup, logout } — calls /api/auth/me on mount
  sockets/
    socketClient.js          # io(SOCKET_URL, { withCredentials: true }) singleton, connect() after login
  routes/
    ProtectedRoute.jsx        # reads AuthContext, redirects to /login if no user, shows spinner while loading
  pages/
    LoginPage.jsx
    SignupPage.jsx
    DashboardPage.jsx          # lists user's families + each member's name/location/updatedAt; triggers geolocation
    FamilyPage.jsx              # single family view: members list, add-member form (creator only)
    FamilyCreatePage.jsx
    NotFoundPage.jsx
  components/
    layout/NavBar.jsx
    layout/ProtectedLayout.jsx    # wraps pages needing shared chrome (navbar) + <Outlet/>
    family/FamilyCard.jsx
    family/MemberList.jsx
    family/AddMemberForm.jsx
    location/LocationUpdater.jsx    # calls navigator.geolocation once, posts to userApi
    notifications/NotificationToast.jsx  # listens to socket events, shows Bootstrap toast
  hooks/
    useGeolocation.js
    useSocket.js
public/
  style.css                 # all custom CSS, mobile-first, on top of Bootstrap
```

## npm packages to add

| Package | Purpose |
|---|---|
| `react-router-dom` | client-side routing, protected route pattern |
| `socket.io-client` | real-time notifications |

Bootstrap 5 and jQuery stay on the existing CDN `<link>`/`<script>` tags in `index.html` — no npm install needed for them. Native `fetch` covers all API calls; no axios.

## Routing

- `/login`, `/signup` — public
- `/` (dashboard), `/family/new`, `/family/:id` — wrapped in `ProtectedRoute` + `ProtectedLayout` (shows `NavBar`)
- `ProtectedRoute` reads `AuthContext`; while the initial `/api/auth/me` call is in flight, shows a loading state instead of flashing the login page; redirects to `/login` on no user.

## Auth state

`AuthContext.jsx` holds `{ user, loading, login, signup, logout }`. On mount, calls `GET /api/auth/me`: 200 → `user` set, 401 → `user` null. `login`/`signup` call the corresponding `authApi` function then re-populate `user` from the response. `logout` calls `POST /api/auth/logout` and clears `user`.

## API client

`api/client.js` is a thin `fetch` wrapper: sets the base URL, always passes `credentials: 'include'` (required so the browser sends the httpOnly JWT cookie automatically), parses JSON, and normalizes error responses into thrown errors the UI can catch and display. `authApi.js`, `familyApi.js`, `userApi.js` are thin functions built on top of it (no need for axios).

## Socket.IO (client side, plain language)

After a successful login, `socketClient.js` opens `io(SOCKET_URL, { withCredentials: true })` — the same JWT cookie used for REST calls is sent automatically at the handshake, so there's no separate socket login step. The server puts the connection into rooms per family the user belongs to plus a personal room; it does not need to be managed client-side.

`hooks/useSocket.js` subscribes to:
- `member:added` — someone was added to (or you were added to) a family
- `location:updated` — a family member's location changed

On either event, `NotificationToast` shows a Bootstrap toast, and the hook can trigger a refetch of `/api/families` so the dashboard updates live without a manual refresh.

## Styling

Mobile-first: design for small screens first, then use Bootstrap's responsive utility classes (`col-*`, `d-*-flex`, grid breakpoints) to adapt for larger screens. All custom rules — spacing tweaks, card styling for member/location display, toast positioning — go into `public/style.css`. No new stylesheets per component, no scattered inline styles beyond genuinely dynamic one-off values.

## Build order

1. Install `react-router-dom`; add `api/client.js`, `AuthContext`, `SignupPage`, `LoginPage`, `ProtectedRoute`, basic `NavBar`. Verify: signup/login in browser, cookie visible in devtools, session survives refresh, logout clears it.
2. `FamilyCreatePage`, `FamilyPage` (`MemberList` + `AddMemberForm`), family list on `DashboardPage`. Verify end-to-end with two registered accounts (backend must already support family endpoints).
3. `useGeolocation` hook + `LocationUpdater` (triggered on dashboard mount or a button) + render name/location/updated-at per member on the dashboard.
4. Install `socket.io-client`; add `socketClient.js`, `useSocket`, `NotificationToast`; wire into dashboard/family views. Verify with two browser sessions (or one incognito): an action in one triggers a live toast in the other without refresh.
5. Mobile-responsive pass on `public/style.css` against Bootstrap breakpoints; loading/error states across pages.
