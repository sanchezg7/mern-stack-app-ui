import Layout from "../components/Layout";
import Link from "next/link";
import axios from "axios";
import { API } from "../config";
import { getCookie, TOKEN } from "../user/auth";

export default function Home({ categories }) {

  const Categories = () => {
    return categories.map(category => {
      return (
          <Link href="/">
            <a style={{border: "1px solid red"}} className="bg-light p-3 col-md-4">
              <div>
                <div className="row">
                  <div className="col-md-4">
                    <img
                        src={category.image.url}
                        alt="Category image, unblock s3 access"
                        style={{"width": "100px", height: "100px"}}
                    />
                  </div>
                  <div className="col-md-8"><h3>{category.name}</h3></div>
                </div>
              </div>
            </a>
          </Link>
      );
    });
  };

  return (
      <Layout>
        <div className="row">
          <h1 className="font-weight-bold">Browse Tutorials/Courses</h1>
          <br />
          <Categories />
        </div>
      </Layout>
  )
};

Home.getInitialProps = async (ctx) => {
  let token;
  if(ctx.req){
    token = ctx.req.cookies.token;
  } else {
    token = getCookie(TOKEN);
  }
  const response = await axios.get(`${API}/category`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return {
    categories: response.data
  }
};