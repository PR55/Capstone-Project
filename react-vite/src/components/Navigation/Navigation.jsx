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
        <img className='navLogo'src="https://elot-bucket.s3.us-east-2.amazonaws.com/ELot-Logo.png" alt="E-Lot Logo. Click to return home" onClick={() => navigate('/')}/>
      {/* <NavLink className='navL' to="/">Home</NavLink> */}
      <NavLink className='navL' to="/traditional/products">Traditional Products</NavLink>
      <NavLink className='navL' to="/electronic/products">Electronic Products</NavLink>
      {user ? <NavLink className='navL' to="/products/new">Post Product</NavLink>:null}
      <NavLink className='navL' to="/articles">Articles</NavLink>
      {user ? <NavLink className='navL' to="/articles/new">Post Article</NavLink>:null}
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
