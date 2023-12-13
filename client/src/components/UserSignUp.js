import { useNavigate } from "react-router-dom";

const UserSignUp = () => {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
      }
      const handleCancel = (e) => {
        e.preventDefault();
          navigate('/');
      }

   return (
    <main>
        <div className="form--centered">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                <label for="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" value=""/>
                <label for="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" value=""/>
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value=""></input>
                    
                <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                </div>

    </main>
   )
}
export default UserSignUp;