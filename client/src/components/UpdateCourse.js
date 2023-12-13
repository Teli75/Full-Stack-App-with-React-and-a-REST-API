import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const UpdateCourse = () => {
  const navigate = useNavigate();
    const [course, setCourse] = useState({
    title: "",
    description: "",
   estimatedTime: "",
    materialsNeeded: "",
    userId: ""
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
            setCourse(data.course);
          })
          .catch((error) => {
            console.log("Error fetching data");
          });
    };

    //Allows components to render when they're mounted
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  fetch(`http://localhost:5000/api/courses/${id}`, {method:'PUT'}, course)
  .then((response) => response.json())
  .catch((error) => {
  console.log("Error handling post request");
        })
  }

// const handleChange = (e) => {
//   setCourse({title: e.target.value,
//     description: e.target.value,
//     estimatedTime: e.target.value,
//     materialsNeeded: e.target.value
//   });
//   }
// const handleChange = (e) => {
//   const { name, value } = e.target;
//       setCourse((prevState) => ({
//         ...prevState,
//         [name]: value
//       }));
// };
const handleChange = (e) => {
  const { name, value } = e.target;
      setCourse({[name]: value });
};

const handleCancel = (e) => {
  e.preventDefault();
    navigate('/');
}

    return(

<main>
<div className="wrap">
    <h2>Update Course</h2>
     <form onSubmit={handleSubmit}> 
    {/* <form> */}
        <div className="main--flex">
            <div>
            {/* https://blog.logrocket.com/using-react-usestate-object/ */}
            {/* https://javascript.plainenglish.io/how-to-fix-the-issue-where-we-cant-type-in-a-react-input-text-field-b7f4bcb4f5f3 */}
            {/* https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable */}
                <label htmlFor="courseTitle">Course Title</label>
                <input id="courseTitle" name="courseTitle" type="text" value={ course.title } onChange= {handleChange}/>
                <p>By Joe Smith</p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea id="courseDescription" name="courseDescription" value={ course.description } onChange= {handleChange}></textarea>
            </div>
            <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input id="estimatedTime" name="estimatedTime" type="text" value={ course.estimatedTime } onChange= {handleChange}/>

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea id="materialsNeeded" name="materialsNeeded" value={ course.materialsNeeded } onChange= {handleChange}></textarea>
            </div>
        </div>
        <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
    </form>
</div>
</main>
    )
}
export default UpdateCourse;