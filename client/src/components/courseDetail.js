import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


 const CourseDetail =  () => {
    const [course, setCourse] = useState([]);
    const { id } = useParams();

    const fetchOptions = {
        method: "GET"
    };
    const apiUrl = `http://localhost:5000/api/courses/${id}`;

    const fetchData = () => {
        fetch(apiUrl, fetchOptions)
          .then((response) => response.json())
          .then((data) => {
            setCourse(data);
          })
          .catch((error) => {
            // Handle the error
          });
    };
    //Allows components to render when they're mounted
  useEffect(() => {
    fetchData();
  }, []);


    
    return (
        <main>
        <div className="actions--bar">
            <div className="wrap">
                <a className="button" href={`/courses/${id}/update`}>Update Course</a>
                <a className="button" href="#">Delete Course</a>
                <a className="button button-secondary" href="/">Return to List</a>
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
                        <p>{course.estimateTime}</p>

                        <h3 className="course--detail--title">Materials Needed</h3>
                        <ul className="course--detail--list">
                            <li>1/2 x 3/4 inch parting strip</li>
                            <li>Wood Filler</li>
                            <li>Minwax Oil Based Polyurethane</li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    </main>
    )};

export default CourseDetail;


 