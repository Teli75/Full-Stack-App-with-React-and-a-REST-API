import { NavLink } from 'react-router-dom';


const Nav = () => (
  
  <nav className="main-nav">
    <ul>
      <li><NavLink to="/courses/:id" >  </NavLink></li>
      <li><NavLink to="/courses/create">  </NavLink></li>
    </ul>
  </nav>


);

export default Nav;