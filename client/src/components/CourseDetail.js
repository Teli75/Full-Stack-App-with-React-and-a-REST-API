import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Markdown from 'react-markdown';
import { useContext } from "react";
import UserContext from "../context/UserContext";


 const CourseDetail =  () => {
  const { authUser } = useContext(UserContext);
    const [course, setCourse] = useState([]);
    const { id } = useParams();

    const apiUrl = `http://localhost:5000/api/courses/${id}`;

    const fetchData = () => {
        fetch(apiUrl, {method: 'GET'})
          .then((response) => response.json())
          .then((data) => {
            setCourse(data.course);
          })
          .catch((error) => {
            // Handle the error
          });
    };
    //Allows components to render when they're mounted
  useEffect(() => {
    fetchData();
  }, [authUser]);

  const deleteCourse = () => {
    fetch(`http://localhost:5000/api/courses/${id}`, {method:'DELETE'})
    .then((response) => response.json())
  }
    
    return (
        <main>
        <div className="actions--bar">
            <div className="wrap">
              { authUser === null ?
              <a className="button button-secondary" href="/">Return to List</a> :
              <>
                <a className="button" href={`/courses/${id}/update`}>Update Course</a>
                <a className="button" onClick={deleteCourse} >Delete Course</a>
                <a className="button button-secondary" href="/">Return to List</a>
                </>
              }
            </div>
        </div>
        
        <div className="wrap">
            <h2>Course Detail</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">{course.title}</h4>
                        <p>By Joe Smith</p>

                        <p>{course.description}</p>
                    </div>
                    <div>
                        <h3 className="course--detail--title">Estimated Time</h3>
                        <p>{course.estimatedTime}</p>

                        <h3 className="course--detail--title">Materials Needed</h3>
                        <ul className="course--detail--list">
                           <Markdown>{course.materialsNeeded}</Markdown>
{/*                         
                            {courseMaterialsNeeded.map((material) => {
                                return (
                                 <li>{ material }</li>
                                )
                            })} */}
                           
                          
                        </ul>
                    </div>
                </div>
            </form>
        </div>

    </main>
   
    )};

export default CourseDetail;


 