import { get, post } from "./client.js";

export const signup = (data) => post("/auth/signup", data);
export const login = (data) => post("/auth/login", data);
export const logout = () => post("/auth/logout");
export const me = () => get("/auth/me");