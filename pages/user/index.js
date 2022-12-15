import Layout from "../../components/Layout";
import axios from "axios";
import {API} from "../../config";
import {getCookie, TOKEN} from "../../user/auth";

const User = ({ user }) => {
  return (
    <Layout>User page<p>{JSON.stringify(user)}</p></Layout>
  );
};

User.getInitialProps = async (ctx) => {
  // const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
  // return {
  //   todos: response.data
  // };

  console.log("REQUEST OBJECT!", ctx.req);
  const token = getCookie(TOKEN, ctx.req);

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