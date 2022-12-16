import {getCookie, TOKEN} from "./auth";
import axios from "axios";
import {API} from "../config";

const withAdmin = Page => {
    const WithAuthAdmin = props => <Page {...props} />;
    WithAuthAdmin.getInitialProps = async (ctx) => {
        let token;
        if (ctx.req) {
            token = ctx.req.cookies.token;
        } else {
            token = getCookie(TOKEN)
        }
        let user;
        try {
            const response = await axios.get(`${API}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    contentType: "application/json"
                }
            });
            user = response.data;
        } catch (error) {
            if (error.response.status !== 200) {
                return null;
            }
        }

        if(user === null){
            // redirect
            ctx.res.writeHead(302, {
                Location: "/"
            });
            ctx.res.end();
        } else {
            return {
                ...(Page.getInitialProps
                    ? await Page.getInitialProps(ctx)
                    : {}),
                user,
                token
            }
        }
    }

    return WithAuthAdmin
};

export default withAdmin;