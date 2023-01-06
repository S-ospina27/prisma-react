import jwtDecode from "jwt-decode";
import { get } from "../components/tools/SessionSettings";
import Home from "../pages/Home";

function AdministratorMiddleware({ children }) {
  const [jwt, setJwt] = useState(jwtDecode(get("jwt")));
  return jwt.data.idroles != 1 ? <Home /> : children;
}

export default AdministratorMiddleware;
