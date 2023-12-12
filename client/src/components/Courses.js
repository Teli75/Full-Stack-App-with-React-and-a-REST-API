import React, { useState, useEffect } from "react";


const Courses = ( ) =>{


  const [course, setCourse] = useState([]);

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
    const results = course;

    let courses;


    // Pro Tip: Allow the Courses and CourseDetail components to retrieve their data from the REST API when those components are mounted. 
//course = results.map((courses) => {

    return (
      <div className="wrap main--grid">
        {courses = results.map((course) => {
          return(

        <a className="course--module course--link" href="course-detail.html">
                <h2 className="course--label"> course </h2>
                <h3 className="course--title">{ course.title }</h3>
            </a>
          );
        })
      }
      
        <a className="course--module course--add--module" href="create-course.html">
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