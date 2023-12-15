import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

/* Provides navigations links*/
const Nav = () => {
  const { authUser } = useContext(UserContext);
  const { actions } = useContext(UserContext);

  return (
    <nav>
      {authUser === null ? (
        <>
          <Link to="/signin">Signin</Link>
          <br></br>
          <Link to="/signup">Signup</Link>
        </>
      ) : (
        <ul className="header--signedin">
          <li>Welcome, {authUser.firstName}</li>
          <li>

            <br></br>
            <Link to="/"><span onClick={actions.signOut}>Sign Out</span></Link>
           
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
