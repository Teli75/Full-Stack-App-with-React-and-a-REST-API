import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";


/*If user has signed-in, outlet tag renders the child routes, else user is asked to signin */
const PrivateRoute = () => {
  const { authUser } = useContext(UserContext);
  const location = useLocation();

  if (authUser) {
    return <Outlet />;
  } else {
    return <Navigate to="/signin" state={{from: location.pathname}}/>;
  }
};

export default PrivateRoute;
