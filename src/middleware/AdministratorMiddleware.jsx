import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../components/tools/SessionSettings";

function AdministratorMiddleware({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = jwtDecode(get('jwt'));

    if (jwt.data.idroles != 1) {
      navigate('/');
    }
  }, []);

  return children;
}

export default AdministratorMiddleware;