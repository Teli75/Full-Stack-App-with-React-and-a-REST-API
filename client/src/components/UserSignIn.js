import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const UserSignIn = () => {
  // State
  const username = useRef(null);
  const password = useRef(null);

  const navigate = useNavigate();

  // Event Handlers
  const handleSubmit = (event) => {
    event.preventDefault();

    
  //call signIn function from userContext I need to create
    navigate("/");
  }

  const handleCancel = (e) =>{
    e.preventDefault();
    navigate('/');
}

  return (
    <main>
      <div class="form--centered">
        <h2>Sign In</h2>
        <p>
          Don't have a user account? Click here to <a href="/signup">sign up</a>
          !
        </p>
        <form>
          <label for="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value=""
          ></input>
          <label for="password">Password</label>
          <input id="password" name="password" type="password" value=""></input>
        </form>

        <button class="button" type="submit">
          Sign In
        </button>
        <button
          class="button button-secondary"
          onClick={handleCancel} >
          Cancel
        </button>
      </div>
    </main>
  );
};

export default UserSignIn;
