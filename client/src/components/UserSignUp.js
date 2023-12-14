import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const UserSignUp = () => {
  const navigate = useNavigate();

  // State
  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

   // Event Handlers
  const handleSubmit = async (e) => {
    console.log('entered handle submit signup')
    e.preventDefault();

    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: email.current.value,
      password: password.current.value,
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users",
        fetchOptions
      );
      if (response.status === 201) {
        console.log(`${user.firstName} is authenticated succesfully!`);
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
        console.log(data);
        // ERROR:  SequelizeUniqueConstraintError
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
        { errors.length ? (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            { errors.map((error, i) => 
            <li key={i}> {error}</li>)}

          </ul>
        </div>)
        :  null } 
        <form onSubmit={handleSubmit}>
          <label for="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" ref={firstName} />
          <label for="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" ref={lastName} />
          <label for="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            ref={email}
          ></input>
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
