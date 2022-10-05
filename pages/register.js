import React, { useState } from "react";
import Layout from "../components/Layout";

const register = () => {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        buttonText: 'Register'
    });

    const handleChange = e => {
        e.preventDefault();
        const newState = {...state};
        const name = e.target.name;
        const value = e.target.value;
        newState[name] = value;
        setState(newState);
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.table(e);
    }

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <h1>Register</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input onChange={handleChange} type="text" name="name" className="form-control" placeholder="Name" value={state.name}/>
                    </div>
                    <div className="form-group">
                        <input onChange={handleChange} type="email" name="email" className="form-control" placeholder="email" value={state.email}/>
                    </div>
                    <div className="form-group">
                        <input onChange={handleChange} type="password" name="password" className="form-control" placeholder="password" />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-outline-warning">{state.buttonText}</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
};

export default register;