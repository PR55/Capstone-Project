import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import { useEffect, useState } from "react";
import { thunkLogout } from "../../redux/session";
import { clearThunkUserContent } from "../../redux/userContent";
import { clearThunkTransactions } from "../../redux/transaction";
import { clearCart } from "../cart";

function Navigation() {
  const user = useSelector(store => store.session.user)

  const [showHamburger, setShowHamburger] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(thunkLogout());
    dispatch(clearThunkUserContent());
    dispatch(clearThunkTransactions());
    clearCart();
    setShowHamburger(false);
    navigate('/')
    window.scrollTo({top:0, left:0, behavior:"instant"})
  };

  useEffect(() => {
    if(window.innerWidth > 960 && showHamburger){
      setShowHamburger(false)
    }
  }, [window.innerWidth])

  useEffect(()=>{
    if(showHamburger){
      document.body.className = 'boiceHolder'
    }else{
      document.body.className = ''
    }
  }, [showHamburger])

  return (
    <>
      <div className="navBar">
        <div className="navLinks">
          <img className='navLogo' src="https://elot-bucket.s3.us-east-2.amazonaws.com/ELot-Logo.png" alt="E-Lot Logo. Click to return home" onClick={() => navigate('/')} />
          {/* <NavLink className='navL' to="/">Home</NavLink> */}
          <NavLink className='navL' to="/traditional/products">Traditional Products</NavLink>
          <NavLink className='navL' to="/electronic/products">Electronic Products</NavLink>
          {user ? <NavLink className='navL' to="/products/new">Post Product</NavLink> : null}
          <NavLink className='navL' to="/articles">Articles</NavLink>
          {user ? <NavLink className='navL' to="/articles/new">Post Article</NavLink> : null}
        </div>
        {
          !user
            ?
            <div className="loginButtons">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/login')
                  window.scrollTo({top:0, left:0, behavior:"instant"})
                }}>Login</button>
              <button onClick={(e) => {
                e.preventDefault();
                navigate('/signup')
                window.scrollTo({top:0, left:0, behavior:"instant"})
              }}>Sign Up</button>
            </div>
            :
            <div className="loggedInButtons">
              <FaCartShopping className="cart" onClick={() => navigate('/cart')} />
              <ProfileButton />
            </div>
        }
      </div>

      <div className="HamburgerMenu" onClick={(e) => {
        e.stopPropagation()
        window.scrollTo({top:0, left:0, behavior:"instant"})
        setShowHamburger(true)
      }}>
        <RxHamburgerMenu />
      </div>

      <div className={showHamburger ? 'hamburgerMenu' : 'hidden'}>
        <ImCross onClick={e => {
          e.stopPropagation()
          setShowHamburger(false)
        }} className="closeHamburger" />
        <div className="menuInterior">
          <h1
            className="hamburgerButton"
            onClick={(e) => {
              e.preventDefault();
              setShowHamburger(false)
              navigate('/traditional/products')
              window.scrollTo({top:0, left:0, behavior:"instant"})
            }}>Traditional Products</h1>
          <h1
            className="hamburgerButton" onClick={(e) => {
              e.preventDefault();
              setShowHamburger(false)
              navigate('/electronic/products')
              window.scrollTo({top:0, left:0, behavior:"instant"})
            }}>Electronic Products</h1>
          <h1
            className={user ? 'hamburgerButton' : 'hidden'}
            onClick={(e) => {
              e.preventDefault();
              setShowHamburger(false)
              navigate('/products/new')
              window.scrollTo({top:0, left:0, behavior:"instant"})
            }}>Post Product</h1>
          <h1
            className="hamburgerButton" onClick={(e) => {
              e.preventDefault();
              setShowHamburger(false)
              navigate('/articles')
              window.scrollTo({top:0, left:0, behavior:"instant"})
            }}>Articles</h1>
          <h1
            className={!user ? 'hidden' : 'hamburgerButton'}
            onClick={(e) => {
              e.preventDefault();
              setShowHamburger(false)
              navigate('/articles/new')
              window.scrollTo({top:0, left:0, behavior:"instant"})
            }}>Post Article</h1>
          {
            !user
              ?
              <>
                <h1
                  className="hamburgerButtonUser"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowHamburger(false)
                    navigate('/login')
                    window.scrollTo({top:0, left:0, behavior:"instant"})
                  }}>Login</h1>
                <h1
                  className="hamburgerButtonUser" onClick={(e) => {
                    e.preventDefault();
                    setShowHamburger(false)
                    navigate('/signup')
                    window.scrollTo({top:0, left:0, behavior:"instant"})
                  }}>Sign Up</h1>
              </>
              :
              <>
              <h1
                  className="hamburgerButtonUser"
                  onClick={e => {
                    e.stopPropagation()
                    setShowHamburger(false)
                    navigate(`/cart`)
                    window.scrollTo({top:0, left:0, behavior:"instant"})
                  }}
                >View Cart</h1>
                <h1
                  className="hamburgerButtonUser"
                  onClick={e => {
                    e.stopPropagation()
                    setShowHamburger(false)
                    navigate(`/user/${user.id}`)
                    window.scrollTo({top:0, left:0, behavior:"instant"})
                  }}
                >View Profile</h1>
                <h1
                  className="hamburgerButtonUser"
                  onClick={e => {
                    e.stopPropagation()
                    setShowHamburger(false)
                    navigate(`/manage`)
                    window.scrollTo({top:0, left:0, behavior:"instant"})
                  }}
                >Manage</h1>
                <h1
                  className="hamburgerButtonUser"
                  onClick={e => {
                    e.stopPropagation()
                    setShowHamburger(false)
                    navigate(`/my-transactions`)
                    window.scrollTo({top:0, left:0, behavior:"instant"})
                  }}
                >Transactions</h1>
                <h1
                  className="hamburgerButtonUser"
                  onClick={logout}
                >Log Out</h1>
              </>
          }
        </div>
      </div>

    </>
  );
}

export default Navigation;
