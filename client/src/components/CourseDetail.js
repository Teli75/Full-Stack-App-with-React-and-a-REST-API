import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import UserContext from "../context/UserContext";
import { api } from "../utils/apiHelper";

const CourseDetail = () => {
  const { authUser } = useContext(UserContext);
  const [course, setCourse] = useState([]);
  const [courseUser, setCourseUser] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    const response = await api(`/courses/${id}`, "GET", null, null);
    if (response.status === 200) {
      const course = await response.json();
      setCourse(course.course);
      setCourseUser(course.course.User);
      console.log(course);
      console.log(courseUser.lastName);
    }
    console.log(courseUser.lastName);
    //In JSX I cannot use array or objects, only properties it seems.
    //Bc course is an arr of objects including the user object, I created another state for the user
  };

  const deleteCourse = () => {
    fetch(`http://localhost:5000/api/courses/${id}`, { method: "DELETE" }).then(
      (response) => response.json()
    );
  };

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          {authUser === null ? (
            <a className="button button-secondary" href="/">
              Return to List
            </a>
          ) : (
            <>
              <a className="button" href={`/courses/${id}/update`}>
                Update Course
              </a>
              <a className="button" onClick={deleteCourse}>
                Delete Course
              </a>
              <a className="button button-secondary" href="/">
                Return to List
              </a>
            </>
          )}
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>{`By ${courseUser.firstName} ${courseUser.lastName}`}</p>

              <p>{course.description}</p>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <Markdown>{course.materialsNeeded}</Markdown>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CourseDetail;
