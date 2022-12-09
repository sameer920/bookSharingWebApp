import React, { useState } from "react";
import { redirect } from "./helperFunctions";
import "./styles/loginAndRegister.css";

function Register() {
    // fetch("http://localhost:4000/Register").then(response =>response.json()).then(data => console.log(data))
    const [page, changePage] = useState("Login");
    function switchPage() {
        if (page === "Login") {
            changePage("Register");
        }
        else {
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
        console.log(page)
        event.preventDefault();
        return fetch("http://localhost:4000/" + page, {
            method: "POST",
            headers: new Headers({ 'content-type': 'application/json', 'Accept': 'application/json' }),
            mode: "cors",
            body: JSON.stringify(formValue),
            credentials: "include"
        })
            .then((response) => {
                // console.log(response)
                redirect(response, window);
            })
            .then((data) => console.log(data))
            .catch(err => console.log(err))

    }

    return <div>
        <img className="big-logo" src="/logo.png" alt="logo" />
        <div className="card">
            <h2>{page} </h2>
            <form method="post" onSubmit={sendToBackend}>
                {page === "Register" && <input type="text" className="input" name="name" placeholder="Name" onChange={handleChange} value={formValue.name} />}
                <input name="email" className="input" type="email" placeholder="Email" onChange={handleChange} value={formValue.email} />
                {page === "Register" && <input className="input" type="text" name="contact" placeholder="Contact" onChange={handleChange} value={formValue.contact} />}
                <input name="password" className="input" type="password" placeholder="Password" onChange={handleChange} value={formValue.password} />
                {page === "Register" && <input className="input" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} value={formValue.confirmPassword} />}
                <input type="submit" className="input" class="button-large button-primary" value={page} />
            </form>
            <input type="button" value={page === "Login" ? "Register" : "Sign-in"} className="button-large button-secondary" onClick={switchPage} />

        </div>
    </div>
}

export default Register;