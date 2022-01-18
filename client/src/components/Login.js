import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
    let history = useHistory();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const { email, password } = credentials;
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const sendLoginData = async (e) => {
        try {
            e.preventDefault();
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const json = await res.json();
            if (res.status === 200 && json.success) {
                await localStorage.setItem("token", json.jwtToken);
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
            <div className="loginContainer">
                <form id='loginForm' onSubmit={sendLoginData}>
                    <h3>Login Here</h3>
                    <input className='myLoginInput mb-4 mt-4' type="email" name="email" id="email" placeholder='Email Address' value={credentials.email} onChange={onChange} />
                    <input className='myLoginInput mb-4' type="password" name="password" id="password" placeholder='Enter Password' value={credentials.password} onChange={onChange} />
                    <p className='forgotPassLink'>Forgot Password?</p>
                    <Button type="submit" variant="contained" className='buttonLogin' color="primary">Login</Button>
                    <p className='signupLink'>New at INotebook ?<Link to="/signup">Signup Here!</Link></p>
                </form>
            </div>
        </div >
    )
}

export default Login
