import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import jwt from "jsonwebtoken";
import axios from "axios";
import Layout from "../../../components/Layout";
import { showErrorMessage, showSuccessMessage } from "../../register.notification";
import {API} from "../../../config";

const ActivateAccount = ({ router }) => {
    const [state, setState] = useState({
        name: '',
        token: '',
        buttonText: 'Activate Account',
        success: '',
        error: ''
    });
    // let token = router.query.id;

    const { name, /*token,*/ buttonText, success, error } = state;

    useEffect(() => {
        // let token = router.query.id;
        console.log(router.query.id);
        if(token) {
            const { name } = jwt.decode(token);
            setState({...state, name});
        }
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        setState({...state, buttonText: "Activating"});
        try{
            const response = await axios.post(`${API}/register/activate`, {
                  token
            });
            console.log("")
            setState({...state, name: '', token: '', buttonText: 'Activated', success: response.data.message});
        } catch (error) {
            setState({...state, buttonText: "Activate Account", error: error.response.data.error });
        }
    };

    // return (
    //     <Layout>
    //         <div className="row">
    //             <div className="col-md-6 offset-md-3">
    //                 <h1>Hello {name}, let's activate your account.</h1>
    //                 {success && showSuccessMessage(success)}
    //                 {error && showErrorMessage(error)}
    //                 <button
    //                     className="btn btn-outline-warning btn-block"
    //                     onClick={handleSubmit}
    //                 >{buttonText}</button>
    //             </div>
    //
    //         </div>
    //     </Layout>
    // )
    return <div>{JSON.stringify(router)}</div>
};

export default withRouter(ActivateAccount);