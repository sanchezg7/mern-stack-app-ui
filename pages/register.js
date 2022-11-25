import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { showSuccessMessage, showErrorMessage } from "./register.notification";

const register = () => {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: '',
        buttonText: 'Register'
    });

    const { name, email, password, success, error } = state;

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

        setState({
            ...state,
            buttonText: 'Registering...'
        });
        axios.request({
            // TODO: setup a local proxy to reroute to the address while still having the same route
            url: "http://localhost:8080/api/register",
            method: "POST",
            data: {
                name,
                email,
                password
            }
        })
            .then(response => {
                console.log(response);
                setState({
                    ...state,
                    name: '',
                    email: '',
                    password: '',
                    buttonText: 'Submitted',
                    success: response.data.message
                })
            })
            .catch(e => {
                console.error(e);
                setState({...state, buttonText: 'Register', error: e.response.data.error})
            });
    }

    return (
        <Layout>
            {success && showSuccessMessage(success)}
            {error && showErrorMessage(error)}
            <div className="col-md-6 offset-md-3">
                <h1>Register</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input onChange={handleChange} type="text" name="name" className="form-control" placeholder="Name" value={name}/>
                    </div>
                    <div className="form-group">
                        <input onChange={handleChange} type="email" name="email" className="form-control" placeholder="email" value={email}/>
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