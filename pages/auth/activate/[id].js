import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../../components/Layout";
import { showErrorMessage, showSuccessMessage } from "../../register.notification";
import {API} from "../../../config";

const ActivateAccount = () => {
    const router = useRouter();
    const [state, setState] = useState({
        name: '',
        token: '',
        buttonText: 'Activate Account',
        success: '',
        error: ''
    });

    const { name, buttonText, success, error } = state;

    const handleSubmit = async e => {
        e.preventDefault();
        setState({...state, buttonText: "Activating"});
        // had to access the router query param here because it wasn't happening in the root render scope of the component
        let token = router.query.id;
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

    return (
        <Layout>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Hello {name}, let's activate your account.</h1>
                    {success && showSuccessMessage(success)}
                    {error && showErrorMessage(error)}
                    <button
                        className="btn btn-outline-warning btn-block"
                        onClick={handleSubmit}
                    >{buttonText}</button>
                </div>

            </div>
        </Layout>
    )
    return <div>{JSON.stringify(router)}</div>
};

export default ActivateAccount;