import jwtDecode from "jwt-decode";
import { useState } from "react";
import { get } from "../components/tools/SessionSettings";
import NotFound from "../pages/NotFound";

function AdministratorMiddleware({ children }) {
  const [jwt, setJwt] = useState(jwtDecode(get("jwt")));
  return jwt.data.idroles != 1 ? <NotFound /> : children;
}

export default AdministratorMiddleware;
