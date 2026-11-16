import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/config";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setblogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch(`${BASE_URL}/blog/getallblogs`);
    const { data } = await res.json();
    setblogs(data);
  };
  return (
    <div className="container">
      <h2>Explore Our Blogs</h2>
      <div className="row">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog, _i) => (
            <div className="col-lg-4" key={_i}>
              <div className="card" style={{width: "18rem"}}>
                <div className="text-center">
                  <img src={blog.poster} className="card-img-top" alt={blog.title} style={{width:"200px"}}/>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Title : {blog.title}</h5>
                  <p className="card-text">
                    {blog.subTitle}
                  </p>
                  <Link to={`/blog/${blog._id}`}  className="btn btn-primary">
                    Read More...
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h6>Loading...</h6>
        )}
      </div>
    </div>
  );
};

export default Home;
