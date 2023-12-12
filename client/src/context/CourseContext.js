import { createContext, useState } from "react";

const CourseContext = createContext(null);

export const CourseProvider = (props) => {
  const [course, setCourse] = useState(null);

  const CourseDetail = ( title, description) => {
    //Create a course object that I can use in other components
    const Course = {
        title,
        description
    };
    setCourse = Course;
  }

  return (
    <CourseContext.Provider
      value={{
        course,
        actions: {
            getCourseDetail: CourseDetail
        }
      }}
    >
      {props.children}
    </CourseContext.Provider>
  );
};

export default CourseContext;
