import logo from "./logo.svg";
import "./App.css";
import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [course, setCourse] = useState([]);

  const fetchOptions = {
    method: "GET",
    // headers: {
    //   Authorization: `Basic ${encodedCredentials}`
  };

  //const apiUrl = '../api/routes/course';
  const apiUrl = "http://localhost:5000/api/courses";

  const fetchData = () => {
    fetch(apiUrl, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        // Do something with the data
        setCourse(data);
      })
      .catch((error) => {
        // Handle the error
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      <div>
        <ul>
          {course.map((courseObj, index) => (
            <>
              <li key={courseObj.id}>{courseObj.title}</li>
              <li key={courseObj.id}>{courseObj.description}</li>
              <li key={courseObj.id}>{courseObj.estimatedTime}</li>
              <li key={courseObj.id}>{courseObj.materialsNeeded}</li>
              <br></br>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );
