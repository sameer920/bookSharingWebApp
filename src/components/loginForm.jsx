import React from "react";
import "./styles/loginAndRegister.css";

function LoginForm(props){
    return <div>
    <form method="post" action="/login">
            <input name="username" type="text" placeholder="Email"/>
            <input name="password" type="password" placeholder="Password"/>
            <input type="submit" class="button-large button-primary" value="Sign In" />
        </form>
        <input type="button" value="Register" class="button-large button-secondary" />
        {/* <input type="button" value="" />
        <input type="button" value="" />
        <input type="button" value="" /> */}
        </div>
}

export default LoginForm;