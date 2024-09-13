import { useEffect, useState } from "react";
import { Outlet} from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer";
import { initializeCart } from "../components/cart";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=>{
    initializeCart()
  }, [])

  useEffect(() => {
    window.scrollTo({top:0,left:0, behavior:'instant'})
  }, [window.location.pathname])

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);



  return (
    <>
      <ModalProvider>
        <Navigation />
        {isLoaded && <Outlet />}
        <Modal />
        <Footer/>
      </ModalProvider>
    </>
  );
}
