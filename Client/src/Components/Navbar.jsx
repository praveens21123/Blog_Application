import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthC } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
    const {user, dispatch} = useContext(AuthC)
    const navigate = useNavigate()
    console.log(user);
    

    const logoutHandler = () => {
      dispatch({
        type: "LOGOUT"
      })
      navigate("/")
      toast.error("Logged Out!")
    }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src="https://www.achieversit.com/assets/images/AIT-white.jpg" alt="AIT_Logo" className="w-50" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                All Blogs
              </Link>
            </li>
            {
              user?.role == "user" && <li className="nav-item">
              <Link to="/createblog" className="nav-link">
                Create Blog
              </Link>
            </li>
            }
            {
              user?.role == "admin" && <li className="nav-item">
              <Link to="/users" className="nav-link">
                Users
              </Link>
            </li>
            }
          </ul>
            {
              user ? 
              <div>
                <span className="me-2">{user.name}</span>
                <button className="btn btn-outline-danger" onClick={logoutHandler}>Logout</button>
              </div> :
              <Link to='/login' className="btn btn-outline-secondary me-2">
                 Login
               </Link>
            }
           {
            !user && <Link to='/register' className="btn btn-outline-success">
              Register
            </Link> 
           }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
