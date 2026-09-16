import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "../hooks/useSession.js";
import { setUserAction, setLoadingAction, clearSessionAction } from "../store/store.js";

// Mounted at root: loads /me via TanStack once, writes static session into Redux.
export default function AuthBootstrap() {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useSession();

  useEffect(() => {
    dispatch(setLoadingAction(isLoading));
    if (data) dispatch(setUserAction(data.user));
    if (error) dispatch(clearSessionAction());
  }, [isLoading, data, error, dispatch]);

  return null;
}