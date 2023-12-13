import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const UpdateCourse = () => {
    const [course, setCourse] = useState([]);
    const { id } = useParams();

    const fetchOptions = {
        method: "GET"
    };
    const apiUrl = `http://localhost:5000/api/courses/${id}/update`;

    const fetchData = () => {
        fetch(apiUrl, fetchOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setCourse(data.course);
          })
          .catch((error) => {
            // Handle the error
          });
    };

    //Allows components to render when they're mounted
  useEffect(() => {
    fetchData();
  }, []);
    return(

<main>
<div className="wrap">
    <h2>Update Course</h2>
    <form>
        <div className="main--flex">
            <div>
                <label for="courseTitle">Course Title</label>
                <input id="courseTitle" name="courseTitle" type="text" value={ course.title }/>

                <p>By Joe Smith</p>

                <label for="courseDescription">Course Description</label>
                <textarea id="courseDescription" name="courseDescription" value={ course.description } ></textarea>
            </div>
            <div>
                <label for="estimatedTime">Estimated Time</label>
                <input id="estimatedTime" name="estimatedTime" type="text" value={ course.estimatedTime }/>

                <label for="materialsNeeded">Materials Needed</label>
                <textarea id="materialsNeeded" name="materialsNeeded" value={ course.materialsNeeded }></textarea>
            </div>
        </div>
        <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick="event.preventDefault(); location.href='index.html';">Cancel</button>
    </form>
</div>
</main>
    )
}
export default UpdateCourse;