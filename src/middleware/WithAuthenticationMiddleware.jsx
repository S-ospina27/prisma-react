import session from "../components/tools/SessionSettings";
import Login from "../pages/Login";

function WithAuthenticationMiddleware({ alert, loading, children }) {
  return !session() ? <Login alert={alert} loading={loading} /> : children;
}

export default WithAuthenticationMiddleware;
