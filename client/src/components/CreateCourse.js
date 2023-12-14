import { useNavigate } from "react-router-dom";
import { useState, useContext } from 'react';
import UserContext from "../context/UserContext";

const CreateCourse = () => {
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  console.log(authUser);

  const [course, setCourse] = useState({
    title: "",
    description: "",
   estimatedTime: "",
    materialsNeeded: ""
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  try {
    const response = await('http://localhost:5000/api/courses', {method: 'POST'}, course)
    if (response.status === 201) {
    console.log('course created');
     } else if (response.status === 401){
      const data = await response.json();
        setErrors(data.errors);
        console.log(data);
        console.log("User not authorized to create course");
  } else {
    throw new Error();
  }
} catch (error) {
  console.log(error);
  navigate("/Error");
}
  }

const handleChange = (e) => {
    const { name, value } = e.target;
        setCourse({[name]: value });
};

// const handleChange = (e) => {
//     const { name, value } = e.target;
//         setCourse((prevState) => ({
//           ...prevState,
//           [name]: value
//         }));
//   };
const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        {errors.length ? (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
          { errors.map((error, i) => 
            <li key={i}> {error}</li>)}
          </ul>
        </div>) : null }
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" value= {course.title} onChange={handleChange} />

              <p>By Joe Smith</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                value={ course.description } 
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={course.estimatedTime}
                onChange={handleChange}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" value={ course.materialsNeeded } onChange={handleChange}></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Create Course
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;
