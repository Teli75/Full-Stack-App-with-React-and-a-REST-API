import { useRef, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";

const UserSignIn = () => {
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  // State
  const email = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  // Event Handlers
  const handleSubmit = async (event) => {
    event.preventDefault();

    //Redirects user to his/her previous browsing location after they signin. Previous location is set in Private Route
    let from = "/";

    if (location.state) {
      from = location.state.from;
    }

    const credentials = {
      emailAddress: email.current.value,
      password: password.current.value,
    };

    /* Calls global signin function and passes credentials from user's input as a parameter*/
    try {
      const user = await actions.signIn(credentials);
      if (user) {
        navigate(from);
      } else {
        setErrors("sign in unsuccessful");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        {errors.length ? (
          <p>
            Don't have a user account? Click here to{" "}
            <a href="/signup">sign up</a>!
          </p>
        ) : null}

        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            ref={email}
          ></input>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            ref={password}
          ></input>

          <button className="button" type="submit">
            Sign In
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default UserSignIn;
