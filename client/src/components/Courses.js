import course from "./App.js";

const Courses = ( data) =>{
    const results = data;

    // Pro Tip: Allow the Courses and CourseDetail components to retrieve their data from the REST API when those components are mounted. 
course = results.map((courses) => {


    return (
        <li>
            
        </li>
    )
});

    return(

        <>
    <div>
        <h1>
            Retrieves a list of courses from the REST API's            api/courses route and renders list of courses. 

 Each course needs to link to its respective "Course Detail" screen. This component also renders a link to the "Create Course" screen.


    </h1>
    </div>
    </>
    )

}