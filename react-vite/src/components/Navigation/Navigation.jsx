import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Navigation() {
  const user = useSelector(store => store.session.user)

  const navigate = useNavigate()

  return (
    <div className="navBar">
      <div className="navLinks">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      {user ? <NavLink to="/products/new">Post Product</NavLink>:null}
      <NavLink to="/">Articles</NavLink>
      {user ? <NavLink to="/">Post Article</NavLink>:null}
      </div>
      {
        !user
          ?
          <div className="loginButtons">
            <button onClick={(e) => {
              e.preventDefault();
              navigate('/login')
            }}>Login</button>
            <button onClick={(e) => {
              e.preventDefault();
              navigate('/signup')
            }}>Sign Up</button>
          </div>
          :
          <div className="loggedInButtons">
            <ProfileButton />
          </div>
      }

    </div>
  );
}

export default Navigation;
