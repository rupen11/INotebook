import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
    let history = useHistory();
    const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });
    const { username, email, password } = credentials;
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const sendSignupData = async (e) => {
        try {
            e.preventDefault();
            const res = await fetch("/api/auth/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });
            const json = await res.json();
            if (res.status === 200 && json.success) {
                localStorage.setItem("token", json.jwtToken);
                history.push("/");
                props.showAlert(json.solve, "success");
            }
            else {
                props.showAlert(json.error, "danger");
            }
        }
        catch (err) {
            console.log("Some error occured to login");
        }
    }
    return (
        <div className="container">
            <div className="signupContainer">
                <form id='signupForm' onSubmit={sendSignupData}>
                    <h3>Signup Here</h3>

                    <input className={`mySignupInput mt-4 is-invalid`} type="text" name="username" id="username" placeholder='Enter Username' minLength="3" value={username} onChange={onChange} required />
                    {username.length >= 1 && username.length < 3 ? <div id="usernameFeedback" className="invalid-feedback">Username must be atleast 3 characters</div> : " "}

                    <input className='mySignupInput mt-4 ' type="email" name="email" id="email" placeholder='Enter Email Address' value={email} onChange={onChange} />

                    <input className='mySignupInput mt-4' type="password" name="password" id="password" placeholder='Set Password' minLength="5" value={password} onChange={onChange} required />
                    {password.length >= 1 && password.length < 5 ? <div id="usernameFeedback" className="invalid-feedback">Password must be atleast 5 characters</div> : " "}

                    <Button type="submit" variant="contained" className='buttonSignup mt-4' color="primary">Signup</Button>
                    <p className='loginLink'>Already have an account? <Link to="/login">Login Here!</Link></p>

                </form>
            </div>
        </div >
    )
}

export default Signup
