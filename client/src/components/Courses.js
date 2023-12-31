import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { api } from "../utils/apiHelper";

const Courses = () => {
  //State
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api("/courses", "GET", null, null);
      if (response.status === 200) {
        const courses = await response.json();
        setCourses(courses);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="wrap main--grid">
      {courses.map((course) => {
        return (
          <a
            className="course--module course--link"
            key={course.id}
            href={`/courses/${course.id}`}
          >
            <h2 className="course--label"> course </h2>
            <h3 className="course--title">{course.title}</h3>
          </a>
        );
      })}

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
