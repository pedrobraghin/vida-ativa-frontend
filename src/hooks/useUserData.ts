import { useContext } from "react";
import { UserDataContext } from "../contexts/UserDataContext";

export function useUserData() {
  return useContext(UserDataContext);
}
