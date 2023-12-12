
import "./App.css";
import Header from './components/Header';
import Courses from './components/Courses';
//import CourseDetail from "./components/CourseDetail";
import { Route, Routes } from "react-router-dom";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import NotFound from "./components/NotFound";
import Nav from "./components/Nav";



function App() {
  
  return (
    <>
      <div className="App">
       <Header />
       <Nav />
        <Routes>
       <Route path="/" element={<Courses />}/>
       <Route path="/courses/create" element={ <CreateCourse />} />
       <Route path="/courses/:id/update" element={ <UpdateCourse/>} />
       <Route path="/courses/:id" element={ <CourseDetail />} />
       <Route path="/signin" element={ <UserSignIn />} />
       <Route path="/signup" element={ <UserSignUp />} />
       <Route path="/signout"/>

       </Routes> 
    
      </div>
    </>
  );
}

export default App;


