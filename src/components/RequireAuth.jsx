import { UrlState } from "@/Context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

// eslint-disable-next-line react/prop-types
function RequireAuth({ children }) {
  const navigate = useNavigate();

  const { loading, isAuthenticated } = UrlState();

  useEffect(() => {
    if (!isAuthenticated && loading === false) navigate("/auth");
  }, [isAuthenticated, loading]);

  if (loading) return <BarLoader width={"100%"} color="#51a2ff" />;

  if (isAuthenticated) return children;
}

export default RequireAuth;
