import Link from "next/link";
import Layout from "../../components/Layout";
import withAdmin from "../../user/withAdminHOC";

const Admin = ({ user }) => {
    return (
        <Layout>
            <h1>Layout Dashboard</h1>
            <br />
            <div className="row">
                <div className="col-md-4">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link href="/admin/category/create">
                                <a className="nav-link text-dark" href="">Create Category</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export default withAdmin(Admin);