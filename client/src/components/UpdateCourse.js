import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/apiHelper';
import UserContext from "../context/UserContext";

//import auth user, set userid to be authUser.id, authUser needs to sent with fetch, credentials need to be unencrypted.

const UpdateCourse = () => {
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();

  console.log(authUser);
    // console.log(authUser.password);

  // const decodedPassword = atob(authUser.password); // decode the string

  // const credentials = {
  //   emailAddress: authUser.emailAddress,
  //   password: decodedPassword;
  // };

  // console.log(credentials);

    const [course, setCourse] = useState({
    title: "",
    description: "",
   estimatedTime: "",
    materialsNeeded: "",
    userId: authUser.id
    });

    /* Fetches a single course from db based on params */
    useEffect(() => {
      const fetchData = async () => {
        const response = await api(`/courses/${id}`, "GET", null, null);
        const courseObject= await response.json();
      
        if (response.status === 200) {
          if (authUser.id === courseObject.userId)
        console.log(courseObject.course);
          setCourse(courseObject.course);
  
        }
      };
      fetchData();
    }, []);

    const { id } = useParams();

  /* Fetch call to update course */
  const handleSubmit = async (event) => {
    event.preventDefault();

   console.log(course)
   console.log(authUser.id);
      const response = await api(`/courses/${id}`, "PUT", course, authUser.id);
      if (response.status === 200) {
        const course = await response.json();
        setCourse(course.course);
        
      }
    };
  
    /*Changes course state based of inputs */
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
        <div className="main--flex">
            <div>
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