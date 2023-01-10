import React, { useEffect } from "react";
import Logo from "./Logo";

//Google Auth
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

// import Logo from "../assest/logo.svg"
import {
  MdShoppingCart,
  MdAccountCircle,
  MdLogout,
  MdAddCircleOutline,
  MdVerified,
} from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useSelector, usedDispatch, useDispatch } from "react-redux";
import { setLoginGoogle } from "../redux/userSlice";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  //cart product item
  const cartProductNumber = useSelector(state => state.cartProduct.cartProductItem).length
  // console.log(cartProductNumber)

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //firebase authentication
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  //
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = async () => {
    if (!user.name) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);

      dispatch(
        setLoginGoogle({
          name: providerData[0].displayName,
          img: providerData[0].photoURL,
          email: providerData[0].email,
          uid: providerData[0].uid,
          token: refreshToken,
        })
      );

      //set user detail in localstorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: providerData[0].displayName,
          img: providerData[0].photoURL,
          email: providerData[0].email,
          uid: providerData[0].uid,
          token: refreshToken,
        })
      );
    } else {
      setIsLogin((preve) => !preve);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(
      setLoginGoogle({
        name: "",
        img: "",
        email: "",
        uid: "",
        token: "",
      })
    );
    setIsLogin(false)
  };


 

  return (
    <header className="fixed z-50 w-screen bg-white text-black   px-1 md:px-7 shadow-md select-none">
      {/**desktop & tablet */}
      <div className="hidden md:flex w-full justify-between">
        <Link to={"/"} className="py-2" onClick={()=>window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="flex items-center gap-2 ">
            <Logo />
          </div>
        </Link>

        {user.email && (
          <div className="flex items-center text-red-600 text-base">
            <MdVerified />
            <p className="px-2 hidden lg:block">{user.name}</p>
            {process.env.REACT_APP_ADMIN_ID === user.email &&
              <p className="text-sm text-white bg-red-600 px-3 rounded-full">
              Admin
              </p>
            }
            
          </div>
        )}

        <div className="flex items-center gap-8 ">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 h-full p-0"
          >
            <NavLink  to="/"  onClick={()=>window.scrollTo({top: 0, behavior: 'smooth'})}  className={({isActive}) => `text-base  text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer box-border h-full flex items-center hover:border-b-4 hover:border-red-600 hover:font-semibold p-1  ${isActive ? "border-b-4 border-red-600 font-semibold" : ""} `} end>
              Home
            </NavLink>
            <NavLink to={"/menu"}  onClick={()=>window.scrollTo({top: 0, behavior: 'smooth'})} className={({isActive}) => `text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer  box-border h-full flex items-center hover:border-b-4 hover:border-red-600 hover:font-semibold p-1 ${isActive ? "border-b-4 border-red-600 font-semibold" : ""} `}>
              Menu
            </NavLink>
            <NavLink to={"/about"} onClick={()=>window.scrollTo({top: 0, behavior: 'smooth'})}  className={({isActive}) =>`text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer  box-border h-full flex items-center hover:border-b-4 hover:border-red-600 hover:font-semibold p-1 ${isActive ? "border-b-4 border-red-600 font-semibold" : ""} `}>
              About Us
            </NavLink>
            <NavLink to={"service"} onClick={()=>window.scrollTo({top: 0, behavior: 'smooth'})}  className={({isActive}) =>`text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer  box-border h-full flex items-center hover:border-b-4 hover:border-red-600 hover:font-semibold p-1 ${isActive ? "border-b-4 border-red-600 font-semibold" : ""} `}>
              Service
            </NavLink>
          </motion.ul>
          <motion.div
            whileTap={{ scale: 0.8 }}
            className="relative flex items-center justify-center"
          >
          <Link to={"/cart"} onClick={()=>window.scrollTo({top: 0, behavior: 'smooth'})}>
            <MdShoppingCart className="text-textColor text-2xl cursor-pointer" />
            <div className="absolute top-0 -right-2 w-4 h-4  rounded-full bg-red-600 -translate-y-1/3 text-center">
              <p className="text-sm text-white font-semibold text-center p-0 m-0 ">
                {cartProductNumber}
              </p>
            </div>
            </Link>
          </motion.div>


          <div className="relative">
            <motion.div
              whileTap={{ scale: 0.8 }}
              onClick={handleLogin}
              className="w-8 h-8 bg-black rounded-full flex justify-center items-center cursor-pointer drop-shadow-xl shadow-lg overflow-hidden"
            >
              {user && user.img ? (
                <img src={user.img} className="w-full h-full" />
              ) : (
                <MdAccountCircle className="text-white w-full h-full" />
              )}
            </motion.div>
            {isLogin && (

              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="absolute right-0 bg-white shadow-lg top-9 p-1 rounded"
              >
              <div className="arrowShow"></div>
                <div className="rounded overflow-hidden">
                  {process.env.REACT_APP_ADMIN_ID === user.email &&
                    <Link
                    to={"./createitem"}
                    onClick={()=>setIsLogin(false)}

                    className="whitespace-nowrap flex hover:bg-red-50 hover:text-slate-600 py-1 px-2 items-center w-full gap-3"
                  >
                    New Item
                    <MdAddCircleOutline className="ml-auto " />
                  </Link>
                  }
                </div>

                <div className="rounded overflow-hidden">
                  <Link
                    onClick={handleLogout}
                    to={"./"}
                    className="whitespace-nowrap flex hover:bg-red-50 hover:text-red-600 py-1 px-2 items-center w-full gap-3"
                  >
                    Logout
                    <MdLogout className="ml-auto " />
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex md:hidden w-full  h-full items-center justify-between">
        <div className="flex items-center  ">
          <Link to={"/"} className="py-2">
            <div className="flex items-center gap-2 ">
              <Logo />
            </div>
          </Link>
        </div>

        {user.email && (
          <div className="flex items-center text-red-600 text-sm">
            <MdVerified />
            {/* <p className="px-2">{user.name}</p> */}
            {process.env.REACT_APP_ADMIN_ID === user.email &&
              <p className="text-xs text-white bg-red-600 px-2 mx-2 rounded-full">
              Admin
            </p>
            }
            
          </div>
        )}

        <div className="relative flex gap-5">
          <motion.div
            whileTap={{ scale: 0.8 }}
            className="relative flex items-center justify-center"
          >
          <Link to={"/cart"} onClick={()=>window.scrollTo({top: 0, behavior: 'smooth'})}>
            <MdShoppingCart className="text-textColor text-2xl cursor-pointer" />
            <div className="absolute top-0 -right-2 w-4 h-4  rounded-full bg-red-600 -translate-y-1/3 text-center">
              <p className="text-sm text-white font-semibold text-center p-0 m-0 ">
              {cartProductNumber}
              </p>
            </div>
            </Link>

          </motion.div>
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={handleLogin}
            className="w-8 h-8 bg-black rounded-full flex justify-center items-center cursor-pointer drop-shadow-xl shadow-lg overflow-hidden"
          >
            {user.img ? (
              <img src={user.img} className="w-full h-full" />
            ) : (
              <MdAccountCircle className="text-white w-full h-full" />
            )}
          </motion.div>
          {isLogin && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="absolute right-0 w-screen z-40  bg-white shadow-lg top-12 px-4 py-6 rounded "
            >
            <div className="arrowShow"></div>
              <div className="w-full">
                <ul className="flex flex-col  h-full  ">
                  <NavLink to="/" onClick={()=>setIsLogin(false)} className="text-base  whitespace-nowrap flex hover:bg-red-50 hover:text-slate-600 py-2 rounded hover:font-semibold px-3 items-center w-full gap-3 ">
                    Home
                  </NavLink>
                  <NavLink to={"/menu"} onClick={()=>setIsLogin(false)}  className="text-base  whitespace-nowrap flex hover:bg-red-50 hover:text-slate-600 py-2 rounded hover:font-semibold px-3 items-center w-full gap-3 ">
                    Menu
                  </NavLink>
                  <NavLink to={"about"} onClick={()=>setIsLogin(false)} className="text-base  whitespace-nowrap flex hover:bg-red-50 hover:text-slate-600 py-2 rounded hover:font-semibold px-3 items-center w-full gap-3 ">
                    About Us
                  </NavLink>
                  <NavLink to={"service"} onClick={()=>setIsLogin(false)} className="text-base  whitespace-nowrap flex hover:bg-red-50 hover:text-slate-600 py-2 rounded hover:font-semibold px-3 items-center w-full gap-3 ">
                    Service
                  </NavLink>
                </ul>
              </div>
              <div className="rounded overflow-hidden">
                <Link
                  to={"./createitem"}
                  onClick={()=>setIsLogin(false)}
                  className="whitespace-nowrap flex hover:bg-red-50 hover:text-slate-600 py-2 px-3 items-center w-full gap-3 hover:font-semibold"
                >
                  New Item
                  <MdAddCircleOutline className="ml-auto " />
                </Link>
              </div>
              <div className="rounded overflow-hidden">
                <div
                  onClick={handleLogout}
                  className="whitespace-nowrap flex bg-red-600 text-white hover:bg-red-500 py-1 px-3 items-center w-full gap-3"
                >
                  Logout ({user.name && user.name.split(" ")[0]})
                  <MdLogout className="ml-auto " />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
