import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import UserContext from "../context/UserContext";
import { api } from "../utils/apiHelper";

const CourseDetail = () => {
  const { authUser } = useContext(UserContext);
  const [course, setCourse] = useState([]);
  const { id } = useParams();

  //State
  const navigate = useNavigate();
  const [courseUser, setCourseUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api(`/courses/${id}`, "GET", null, null);
      if (response.status === 200) {
        const course = await response.json();
        setCourse(course.course);
        setCourseUser(course.course.User);
      } else if (!response.course) {
        navigate("/notfound");
      } else {
        throw new Error();
      }
    };
    fetchData();
  }, [id, navigate]);

  /* Fetch call to server to get specific course based off url parameter or course clicked.
  Sets course and user. If user matches course, displays options to update and delete. If there is no response due to invalid course number, navigates users to not found*/

  const deleteCourse = async () => {
    await api(`/courses/${id}`, "DELETE", null, authUser);
    navigate("/");
  };

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          {authUser === null || course.userId !== authUser.id ? (
            <a className="button button-secondary" href="/">
              Return to List
            </a>
          ) : (
            <>
              <a className="button" href={`/courses/${id}/update`}>
                Update Course
              </a>
              <button className="button" onClick={deleteCourse}>
                Delete Course
              </button>
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

              <Markdown>{course.description}</Markdown>
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
