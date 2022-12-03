import React, { useState } from "react";
import "./styles/loginAndRegister.css";

function Register() {
    const [page, changePage] = useState("Login");
    function switchPage(){
        if (page === "Login"){
            changePage("Register");
        }
        else{
            changePage("Login")
        }
    }

    const [formValue, setFormValue] = useState({
        name: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: ""
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setFormValue(prevValue => {
            if (name === "name") {
                return {
                    name: value,
                    email: prevValue.email,
                    contact: prevValue.contact,
                    password: prevValue.password,
                    confirmPassword: prevValue.confirmPassword
                }
            }
            else if (name === "email") {
                return {
                    name: prevValue.name,
                    email: value,
                    contact: prevValue.contact,
                    password: prevValue.password,
                    confirmPassword: prevValue.confirmPassword
                }
            }
            else if (name === "contact") {
                return {
                    name: prevValue.name,
                    email: prevValue.email,
                    contact: value,
                    password: prevValue.password,
                    confirmPassword: prevValue.confirmPassword
                }
            }
            else if (name === "password") {
                return {
                    name: prevValue.name,
                    email: prevValue.email,
                    contact: prevValue.contact,
                    password: value,
                    confirmPassword: prevValue.confirmPassword
                }
            }
            else if (name === "confirmPassword") {
                return {
                    name: prevValue.name,
                    email: prevValue.email,
                    contact: prevValue.contact,
                    password: prevValue.password,
                    confirmPassword: value
                }
            }
        })
    }

    function sendToBackend(event) {
        event.preventDefault();
        fetch("http://localhost:4000/"+page, {
            method: "POST",
            headers: new Headers({'content-type': 'application/json'}),
            mode: "cors",
            body: JSON.stringify(formValue)
        })
    }

    return <div>
        <img className="big-logo" src="/logo.png" alt="logo" />
        <div class="card">
            <h2>{page} </h2>
            <form method="post" onSubmit={sendToBackend}>
                {page === "Register" && <input type="text" name="name" placeholder="Name" onChange={handleChange} value={formValue.name} />}
                <input name="email" type="email" placeholder="Email" onChange={handleChange} value={formValue.email} />
                {page === "Register" && <input type="text" name="contact" placeholder="Contact" onChange={handleChange} value={formValue.contact} />}
                <input name="password" type="password" placeholder="Password" onChange={handleChange} value={formValue.password} />
                {page === "Register" && <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} value={formValue.confirmPassword} />}
                <input type="submit" class="button-large button-primary" value={page} />
            </form>
            <input type="button" value={page === "Login" ? "Register" : "Sign-in"} class="button-large button-secondary" onClick={switchPage} />

        </div>
    </div>
}

export default Register;