import React, { useState } from "react";



const Home = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
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
};

export default Home;
