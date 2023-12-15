import { createContext, useState } from "react";
import Cookies from 'js-cookie';
import { api } from "../utils/apiHelper";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  //Looks for cookie and stores it
  const cookie = Cookies.get("authenticatedUser");
//   const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);
const [authUser, setAuthUser] = useState(cookie? JSON.parse(cookie): null);
useState([]);

const signIn = async (credentials) => {
  console.log('entered signin function');
  console.log(credentials);

    const response = await api("/users", "GET", null, credentials);
      if (response.status === 200) {
        const user = await response.json();
        setAuthUser(user);
         console.log(`${user.firstName} is signed in`);
        Cookies.set("authenticatedUser", JSON.stringify(user), {expires: 1});
        return user;
      } else if (response.status === 401) {
        return null
      } else {
        throw new Error();
      }
    }
  

  const signOut= () => {
    setAuthUser(null);
    Cookies.remove("authenticatedUser");
    console.log('user has been signed out');
  }

return (
   <UserContext.Provider value={{
    authUser,
    actions: {
      signIn,
    signOut}
    }}>
    {props.children}

    </UserContext.Provider>
);
} 

export default UserContext;
