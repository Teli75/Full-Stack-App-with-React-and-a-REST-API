export const api = (
    path,
    method = "GET",
    body = null,
    credentials = null
  ) => {
    const url = "http://localhost:5000/api" + path;
  
    const options = {
      method,
      headers: {}
    };
  
    if (body) {
      options.body = JSON.stringify(body);
      options.headers["Content-Type"] = "application/json; charset=utf-8";
    }
  
    if (credentials) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers.Authorization = `Basic ${encodedCredentials}`;
    }
  
    return fetch(url, options);
  }

/* CREATE USER 
const fetchOptions = {
    method: "POST",
    headers: {
    //indicates body type
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(
      "http://localhost:5000/api/users",
      fetchOptions
    );

*/


/* GET AUTH USER 
const signIn = async (credentials) => {
    console.log('entered signin function');
  
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
  
      const fetchOptions = {
        method: "GET",
        headers: {
            //encoded credentials, header object is empty for now
          Authorization: `Basic ${encodedCredentials}`
        }
      };
  
      const response = await fetch("http://localhost:5000/api/users", fetchOptions);
    }
    */

