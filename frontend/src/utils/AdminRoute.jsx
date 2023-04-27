import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AdminRoute = ({ children, ...rest }) => {
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  console.log(jwt_decode(authTokens.access).isAdmin);
  return !jwt_decode(authTokens.access).isAdmin ? (
    <Navigate to="/login" />
  ) : (
    children
  );
};

export default AdminRoute;
