import { useNavigate } from "react-router-dom";
import { useRef, useState, useContext } from "react";
import { api } from "../utils/apiHelper";

import UserContext from "../context/UserContext";

/* User signin uses UserContext*/
const UserSignUp = () => {
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();

  // State
  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  // Event Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: email.current.value,
      password: password.current.value,
    };

    /* Fetch call to send user inputs to server. 
    If successful, adds user and renders home page. Else if, shows validation errors. Else sends to api for error handling and renders error page*/
    try {
      const response = await api("/users", "POST", user, null);
      if (response.status === 201) {
        await actions.signIn(user);
        navigate("/");
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
      } else {
        throw new Error();
      }
    } catch (error) {
      navigate("/Error");
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
        {errors && errors.length ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, i) => (
                <li key={i}> {error}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" ref={firstName} />
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" ref={lastName} />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            ref={email}
          ></input>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" ref={password} />
          <button className="button" type="submit">
            Sign Up
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};
export default UserSignUp;
