import React from "react";
import "./loginAndRegister.css";
import LoginForm from "./loginForm";

function Login(){
    return <div>
        <img className="big-logo" src="/logo.png" alt="logo"/>
        <div class="card">
        <h2>Login </h2>
        <LoginForm/>
        </div>
    </div>
}

export default Login;