import { useContext } from "react";
import CourseContext from "../context/CourseContext";
import { useParams } from "react-router-dom";
//  // Pro Tip: Allow the Courses and CourseDetail components to retrieve their data from the REST API when those components are mounted.

 const CourseDetail =  () => {
    const { id } = useParams();
    const { course } = useContext(CourseContext);
    

//     // Pro Tip: Allow the Courses and CourseDetail components to retrieve their data from the REST API when those components are mounted. 


    
    return (
        <main>
        <div class="actions--bar">
            <div className="wrap">
                <a className="button" href={`/courses/${id}/update`}>Update Course</a>
                <a className="button" href="#">Delete Course</a>
                <a className="button button-secondary" href="/">Return to List</a>
            </div>
        </div>
        
        <div class="wrap">
            <h2>Course Detail</h2>
            <form>
                <div class="main--flex">
                    <div>
                        <h3 class="course--detail--title">Course</h3>
                        <h4 class="course--name">Title</h4>
                        <p>By Joe Smith</p>

                        <p>The specifications that follow will produce a bookcase with overall</p>
                    </div>
                    <div>
                        <h3 class="course--detail--title">Estimated Time</h3>
                        <p>14 hours</p>

                        <h3 class="course--detail--title">Materials Needed</h3>
                        <ul class="course--detail--list">
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


 