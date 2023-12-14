import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import UserContext from '../context/UserContext';

const UserSignIn = () => {
 
  // const { actions } = useContext(UserContext);
  const navigate = useNavigate();
  // State
  const email = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  // Event Handlers
  const handleSubmit = async (event) => {
     console.log('Entered signin handle submit');
     event.preventDefault();
   

 const credentials = {
      email: email.current.value,
      password: password.current.value,
    };
  
    //Creates a base-64 encoded asci string
  const encodedCredentials = btoa(`${credentials.email}:${credentials.password}`);

    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodedCredentials}`
      }
    };

    try{
      const response = await fetch(
        "http://localhost:5000/api/users",
        fetchOptions
      );
      console.log(response);
      
      if (response.status === 201) {
        console.log(` signed in`);
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
    // try{
    //   const user = await actions.signIn(credentials);
    //   if (user) {
    //     console.log("authenticated!");
    //   } else{
    //      setErrors(["Sign-in was unsuccessful"]);
    //   }
    // }catch (error){
    //   console.log(error);
    //   navigate("/");
    // }
  //}

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        <p>
          Don't have a user account? Click here to <a href="/signup">sign up</a>
          !
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            ref={ email }
          ></input>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" ref={ password }></input>
        </form>

        <button className="button" type="submit">
          Sign In
        </button>
        <button className="button button-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </main>
  );
};

export default UserSignIn;
