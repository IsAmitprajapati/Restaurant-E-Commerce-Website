import React, { useEffect, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components";
import { AnimatePresence } from "framer-motion";
// import toast, { Toaster } from 'react-hot-toast';
import { getAllProductItems } from "./utils/firebaseFunctions";
import { setProductItem } from "./redux/productSlice";
import { useDispatch } from "react-redux";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {

    (async () => {
      const data = await getAllProductItems();
      dispatch(setProductItem(data));
    })();

  }, []);

  return (
   
    <>
      <AnimatePresence onExitComplete>
        <Toaster />
        <div className="w-full h-auto flex flex-col box-border ">
          <Header />
          <main className="mt-16  w-full h-full box-border relative min-h-[calc(100vh-120px)]">
            {/* page render here  */}
            <Outlet />
          </main>

          <footer>
            <Footer />
          </footer>
        </div>
      </AnimatePresence>
    </>
    
  );
};

export default App;
