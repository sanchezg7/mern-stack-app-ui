// import {getCookie, TOKEN} from "./auth";
// import axios from "axios";
// import {API} from "../config";
//
// const withUser = Page => {
//     const WithAuthUser = props => <Page {...props} />;
//     WithAuthUser.getInitialProps = async (ctx) => {
//         let token;
//         if (ctx.req) {
//             token = ctx.req.cookies.token;
//         } else {
//             token = getCookie(TOKEN)
//         }
//         let user;
//         try {
//             const response = await axios.get(`${API}/user`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     contentType: "application/json"
//                 }
//             });
//             user = response.data;
//         } catch (error) {
//             if (error.response.status !== 200) {
//                 return null;
//             }
//         }
//
//         if(user === null){
//             // redirect
//             ctx.res.writeHead(302, {
//                 Location: "/"
//             })
//         } else {
//             return {
//                 ...(Page.getInitialProps
//                     ? await Page.getInitialProps(ctx)
//                     : {}),
//                 user,
//                 token
//             }
//         }
//     }
//
//     return WithAuthUser
// };
//
// export default withUser;