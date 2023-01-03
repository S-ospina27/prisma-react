import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import session from "../components/tools/SessionSettings";

function NoAuthenticationMiddleware({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (session()) {
      navigate('/');
    }
  }, []);

  return children;
}

export default NoAuthenticationMiddleware;