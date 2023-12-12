//Provides signUp screen to create an account
//Sign-up button that sends POST request to the RESTAPI's /api/users routes and signs in the user
//Cancel button that returns to default route, i.e. list of courses

const UserSignUp = () => {

   return (
    <main>
        <div class="form--centered">
                <h2>Sign Up</h2>
                <form>
                <label for="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" value=""/>
                <label for="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" value=""/>
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value=""></input>
                    
                <button class="button" type="submit">Sign Up</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </form>
                </div>

    </main>
   )
}
export default UserSignUp;