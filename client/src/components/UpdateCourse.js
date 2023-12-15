import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/apiHelper';
import UserContext from "../context/UserContext";


const UpdateCourse = () => {
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [courseUser, setCourseUser] = useState([]);

    const [course, setCourse] = useState({
    title: "",
    description: "",
   estimatedTime: "",
    materialsNeeded: "",
    userId: authUser.id
    });

    /* calls fetchData function everytime page is rerendered */
    useEffect(() => {
      fetchData();
    }, []);

    /* Fetches a single course from db based on params */
    const fetchData = async () => {
       
      const response = await api(`/courses/${id}`, "GET", null, null);
      const courseObject= await response.json(); 
      if (response.status === 200) {
        setCourse(courseObject.course);
        setCourseUser(courseObject.course.User);
        console.log(course);
      }
    };
   
  /* Fetch call to update course */
  const handleSubmit = async (event) => {
    event.preventDefault();
      const response = await api(`/courses/${id}`, "PUT", course, authUser);
      console.log(response);
      if (response.status === 204) {
        navigate("/");
      }
    };
  
  /*Changes course state based on inputs */
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
                <p>{course && `By ${courseUser.firstName} ${courseUser.lastName}`}</p>

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