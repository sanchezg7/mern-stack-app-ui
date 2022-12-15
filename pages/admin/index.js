import Layout from "../../components/Layout";
import axios from "axios";
import {API} from "../../config";
import {getCookie, TOKEN} from "../../user/auth";

const Admin = ({ user }) => {
    return (
        <Layout><div>{JSON.stringify(user)}</div></Layout>
    );
};

Admin.getInitialProps = async (ctx) => {
    let token;
    if(ctx.req){
        token = ctx.req.cookies.token;
    } else {
        token = getCookie(TOKEN)
    }
    try {
        const response = await axios.get(`${API}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
                contentType: "application/json"
            }
        });
        return { user: response.data };
    } catch (error) {
        if(error.response.status !== 200) {
            return { user: "no user"}
        }
    }
};

export default Admin;