import Layout from "../../components/Layout";
import axios from "axios";
import {API} from "../../config";
import {getCookie, TOKEN} from "../../user/auth";

const User = ({ user }) => {
  return (
    <Layout><div>{JSON.stringify(user)}</div></Layout>
  );
};

User.getInitialProps = async (ctx) => {
  if(!ctx.req){
    return { user: {"_id":"6393c459df0a61b400d30375","name":"Gerardo S","email":"gellato.sanchips@gmail.com","role":"admin"}};
  }
  const token = ctx.req.cookies.token;
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

export default User;