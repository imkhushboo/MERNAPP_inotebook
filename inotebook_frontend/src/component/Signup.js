import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modalcontext from '../context/modal/modalContext';


const Signup = () => {
    let navigate = useNavigate();
    const { text, setText } = useContext(Modalcontext);
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    let signup = false;
    useEffect(() => {
        setCredentials({ name: "", email: "", password: "" });
    }, [signup])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const host = "http://localhost:5000";
        console.log("helloooo khush!1");
        try {
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
            });
            const json = await response.json();
            console.log(json);
            if (json.success) {
                localStorage.setItem('token', json.token);
                signup = true;
                setText("Sign Up Successfully");
                navigate('../login');
            }
            else {
                setText("Failed Sign Up");
                console.log(credentials);
                console.log("error-----");
            }
        }
        catch (err) {
            setText("Failed Sign Up");
            // setCredentials({ name: "", email: "", password: "" });
            console.log("error!!!");
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        // console.log(credentials);
    }


    return (
        <>
            <div className="container my-3">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Your Name:</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Enter name" onChange={onChange} value={credentials.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} value={credentials.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="password" name="password" autoComplete="on" placeholder="Password" onChange={onChange} value={credentials.password} />
                    </div>
                    <button type="submit" data-toggle="modal" data-target="#exampleModalCenter" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" onClick={(() => { signup ? navigate("/login") : navigate(); })} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{text}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup
