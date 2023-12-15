import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/apiHelper';
import UserContext from "../context/UserContext";

//import auth user, set userid to be authUser.id, authUser needs to sent with fetch, credentials need to be unencrypted.

const UpdateCourse = () => {
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();

  const userId = authUser.id;

  console.log(authUser);

  console.log(authUser.password);

  const decodedData = atob(authUser.password); // decode the string

  const credentials = {
    emailAddress: authUser.emailAddress,
    password: authUser.password
  };

  // console.log(credentials);

    const [course, setCourse] = useState({
    title: "",
    description: "",
   estimatedTime: "",
    materialsNeeded: "",
    userId: ""
    });

    const { id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const fetchData = async () => {
      const response = await api(`/courses/${id}`, "PUT", credentials);
      if (response.status === 200) {
        const course = await response.json();
        setCourse(course.course);
        console.log(course.course.title);
      }
    };
  
const handleChange = (e) => {
  const { name, value } = e.target;
      setCourse((prevState) => ({
        ...prevState,
        [name]: value
      }));
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
                <input id="courseTitle" name="title" type="text" value={ course.title } onChange= {handleChange}/>
                <p>By Joe Smith</p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea id="courseDescription" name="description" value={ course.description } onChange= {handleChange}></textarea>
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