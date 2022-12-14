import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/Layout";
import axios from "axios";
import { showSuccessMessage, showErrorMessage } from "./register.notification";
import { API } from "../config";
import { authenticate, isAuth } from "../user/auth";

const Login = () => {

    const [state, setState] = useState({
        email: '',
        password: '',
        error: '',
        success: '',
        buttonText: 'Login'
    });

    const { email, password, success, error } = state;
    useEffect(() => {
        isAuth() && Router.push("/");
    },[]);

    const handleChange = e => {
        e.preventDefault();
        const newState = {...state, buttonText: "Login" };
        const name = e.target.name;
        const value = e.target.value;
        newState[name] = value;
        setState(newState);
    };

    const handleSubmit = e => {
        e.preventDefault();

        setState({
            ...state,
            buttonText: 'Logging In...'
        });
        axios.request({
            // TODO: setup a local proxy to reroute to the address while still having the same route
            url: `${API}/login`,
            method: "POST",
            data: {
                email,
                password
            }
        })
            .then(response => {
                console.log(response);
                authenticate(response, () => {
                    isAuth() && isAuth().role === "admin"
                        ? Router.push("/admin")
                        : Router.push("/user");
                });
            })
            .catch(e => {
                console.error(e);
                setState({...state, buttonText: 'Login', error: e.response.data.message})
            });
    }

    return (
        <Layout>
            {success && showSuccessMessage(success)}
            {error && showErrorMessage(error)}
            <div className="col-md-6 offset-md-3">
                <h1>Login</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input onChange={handleChange} type="email" name="email" className="form-control" placeholder="email" value={email} required />
                    </div>
                    <div className="form-group">
                        <input onChange={handleChange} type="password" name="password" className="form-control" placeholder="password" required />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-outline-warning">{state.buttonText}</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
};

export default Login;