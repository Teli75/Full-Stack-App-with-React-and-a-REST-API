import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useContext } from "react";
import { api } from "../utils/apiHelper";

import UserContext from "../context/UserContext";

/* Signs user in */
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
    console.log("entered handle submit signup");
    e.preventDefault();

    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: email.current.value,
      password: password.current.value,
    };

    console.log(user);

    /*Creates user and uses userContext to sign in*/
    try {
      const response = await api("/users", "POST", user);
      if (response.status === 201) {
        console.log(`${user.firstName} is signed up!`);
        await actions.signIn(user);
        navigate("/");
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
        console.log(data);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
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
        {errors.length ? (
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
