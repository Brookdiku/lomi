import {AuthContext} from "../context/UserContext";
import { useContext } from "react";

export const useAuth = () => {
  return useContext(AuthContext);
};
