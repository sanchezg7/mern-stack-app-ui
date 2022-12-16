import Layout from "../../components/Layout";
import withAdmin from "../../user/withAdminHOC";

const Admin = ({ user }) => {
    return (
        <Layout><div>{JSON.stringify(user)}</div></Layout>
    );
};

export default withAdmin(Admin);