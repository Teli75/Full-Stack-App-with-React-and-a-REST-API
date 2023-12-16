import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { api } from "../utils/apiHelper";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  //Looks for cookie and stores it
  const cookie = Cookies.get("authenticatedUser");

  //State
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

  /* Signin function sets auth user to a state that can be accessed globally */
  const signIn = async (credentials) => {

    /*Fetch call sends credentials provided UserSignIn.js to server auth-user middlware for authentication. user.password is saved before it's encoded.*/
    const response = await api("/users", "GET", null, credentials);
    if (response.status === 200) {
      const user = await response.json();
      user.password = credentials.password;
      setAuthUser(user);
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
      return user;
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  };

  //Uses SignOut component
  const signOut = () => {
    setAuthUser(null);
    Cookies.remove("authenticatedUser");
  };

  return (
    //Provides access to global objects and functions 
    <UserContext.Provider
      value={{
        authUser,
        actions: {
          signIn,
          signOut,
        },
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
