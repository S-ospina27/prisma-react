import session from "../components/tools/SessionSettings";
import Home from "../pages/Dashboard";

function NoAuthenticationMiddleware({ children }) {
  return session() ? <Home /> : children;
}

export default NoAuthenticationMiddleware;
