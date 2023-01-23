import jwtDecode from "jwt-decode";
import { useState } from "react";
import { get } from "../components/tools/SessionSettings";
import NotFound from "../pages/NotFound";

function NotRolMiddleware({ children, roles }) {
  const [jwt, setJwt] = useState(jwtDecode(get("jwt")));
  return roles.includes(jwt.data.idroles) ? <NotFound /> : children;
}

export default NotRolMiddleware;
