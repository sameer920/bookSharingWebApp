import React from "react";
import "./loginAndRegister.css";

function Register(){
    return <div>
        <img className="big-logo" src="/logo.png" alt="logo"/>
        <div class="card">
        <h2>Register </h2>
        <form method="post" action="/login">
            <input name="username" type="email" placeholder="Email"/>
            <input name="password" type="password" placeholder="Password"/>
            <input name="confirmPassword" type="password" placeholder="Confirm Password"/>
            <input type="submit" class="button-large button-primary" value="Register" />
        </form>
        <input type="button" value="Sign In" class="button-large button-secondary" />
        
        </div>
    </div>
}

export default Register;