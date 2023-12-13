import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

const Courses = ( ) =>{
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  
  //const { actions } = useContext(CourseContext);
  //console.log(actions);
  const fetchOptions = {
    method: "GET",
    // headers: {
    //   Authorization: `Basic ${encodedCredentials}`
  };

  
  const apiUrl = "http://localhost:5000/api/courses";

  const fetchData = () => {
    fetch(apiUrl, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        // Handle the error
      });
  };
//Allows components to render when they're mounted
  useEffect(() => {
    fetchData();
  }, []);

    const results = courses;
    
    

    // Pro Tip: Allow the Courses and CourseDetail components to retrieve their data from the REST API when those components are mounted. 
//course = results.map((courses) => {

    return (
      <div className="wrap main--grid">
        {results.map((course) => {
          return(

        <a className="course--module course--link" key={course.id} href={`/courses/${course.id}`} >
                <h2 className="course--label"> course </h2>
                <h3 className="course--title">{ course.title }</h3>
            </a>
          );
        })
      }
      
        <a className="course--module course--add--module" href="/courses/create">
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </a>
      </div>
    );

    };
export default Courses;