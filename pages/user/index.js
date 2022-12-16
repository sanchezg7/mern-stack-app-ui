import Layout from "../../components/Layout";
import withUser from "../../user/withUserHOC";
import axios from "axios";
import {API} from "../../config";
import {getCookie, TOKEN} from "../../user/auth";

const User = ({ user, token }) => {
  return (
    <Layout><div>{JSON.stringify({user, token})}</div></Layout>
  );
};

export default withUser(User);