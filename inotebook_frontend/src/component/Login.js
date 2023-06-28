import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const host = "http://localhost:5000";
            const response = await fetch(`${host}/api/auth/login`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });
            const json = await response.json();
            console.log(json);
            if (json.success) {
                localStorage.setItem('token', json.token);
                navigate('../notes')
            }
            else
                navigate('/');
        }
        catch (err) {
            navigate('/');
            console.error("error occured!!");
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="container my-3">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="password" name="password" autoComplete="on" placeholder="Password" onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    );
}

export default Login
