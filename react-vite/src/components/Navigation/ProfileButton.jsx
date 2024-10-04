import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";
import { clearThunkUserContent } from "../../redux/userContent";
import { clearCart } from "../cart";
import { clearThunkTransactions } from "../../redux/transaction";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const navigate = useNavigate()

  const toManage = (e) => {
    e.preventDefault()
    closeMenu();
    navigate('/manage')
    window.scrollTo({top:0, left:0, behavior:"instant"})
  }
  const toTransactions = (e) => {
    e.preventDefault()
    closeMenu();
    navigate('/my-transactions')
    window.scrollTo({top:0, left:0, behavior:"instant"})
  }

  const toProfile = (e) => {
    e.preventDefault()
    closeMenu();
    navigate(`/user/${user.id}`)
    window.scrollTo({top:0, left:0, behavior:"instant"})
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    dispatch(clearThunkUserContent());
    dispatch(clearThunkTransactions());
    clearCart();
    closeMenu();
    navigate('/')
    window.scrollTo({top:0, left:0, behavior:"instant"})
  };

  return (
    <>
      <button onClick={toggleMenu} className="userIcoButton">
        <FaUserCircle className="userIcon"/>
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button className='menuButton' onClick={toProfile}>View Profile</button>
              </li>
              <li>
                <button className='menuButton' onClick={toManage}>Manage</button>
              </li>
              <li>
                <button className='menuButton' onClick={toTransactions}>Transactions</button>
              </li>
              <li>
                <button className='menuButton' onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
