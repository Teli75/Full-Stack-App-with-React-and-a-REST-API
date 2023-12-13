import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const UpdateCourse = () => {
    const [course, setCourse] = useState({
    title: "",
    description: "",
   estimatedTime: "",
    materialsNeeded: ""
    });

    const { id } = useParams();

    const fetchOptions = {
        method: "GET"
    };
    const apiUrl = `http://localhost:5000/api/courses/${id}/update`;

    const fetchData = async () => {
        await fetch(apiUrl, fetchOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setCourse(data.course);
            // setTitle(course.title);
            // setDescription(course.description);
            // setEstimatedTime(course.estimatedTime);
            // setMaterialsNeeded(course.materialsNeeded);
          })
          .catch((error) => {
            console.log("Error fetching data");
          });
    };

    //Allows components to render when they're mounted
  useEffect(() => {
    fetchData();
  }, []);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const fetchOptions = {
//       method: "PUT"
//   };
//   const apiUrl = `http://localhost:5000/api/courses/${id}`;

//   const fetchData = async () => {
//       await fetch(apiUrl, fetchOptions)
//         .then((response) => response.json())
//         .then((data) => {
//           console.log(data);
//           setCourse(data.course);
//         })
//         .catch((error) => {
//           console.log("Error handling post request");
//         })
//   }
//   fetchData();
// }

const handleChange = (e) => {
  setCourse(e.target.value);
}

    return(

<main>
<div className="wrap">
    <h2>Update Course</h2>
    {/* <form onSubmit={handleSubmit}> */}
    <form>
        <div className="main--flex">
            <div>
            {/* https://javascript.plainenglish.io/how-to-fix-the-issue-where-we-cant-type-in-a-react-input-text-field-b7f4bcb4f5f3 */}
            {/* https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable */}
                <label for="courseTitle">Course Title</label>
                <input id="courseTitle" name="courseTitle" type="text" value={ course.title } onChange= {handleChange}/>
                <p>By Joe Smith</p>

                <label for="courseDescription">Course Description</label>
                <textarea id="courseDescription" name="courseDescription" value={ course.description } onChange={ (e) => setCourse(e.target.value)} ></textarea>
            </div>
            <div>
                <label for="estimatedTime">Estimated Time</label>
                <input id="estimatedTime" name="estimatedTime" type="text" value={ course.estimatedTime } onChange={ (e) => setCourse(e.target.value)}/>

                <label for="materialsNeeded">Materials Needed</label>
                <textarea id="materialsNeeded" name="materialsNeeded" value={ course.materialsNeeded } onChange={ (e) => setCourse(e.target.value)}></textarea>
            </div>
        </div>
        <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick="event.preventDefault(); location.href='index.html';">Cancel</button>
    </form>
</div>
</main>
    )
}
export default UpdateCourse;