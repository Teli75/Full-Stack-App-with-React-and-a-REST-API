import { Link } from "react-router-dom";
import { useContext } from "react";

const Nav = () => (
  <nav>
    {" "}
    <ul className="header--signedin">
      <li>Welcome, Joe Smith!</li>
      <li>
        {/* a conditional, if user, signout
      if no user, sign in or sign up */}
      <Link to="/signin">Signin</Link>
      <br></br>
      <Link to="/signup">Signup</Link>
      <br></br>
      <Link to="/">Sign Out</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
