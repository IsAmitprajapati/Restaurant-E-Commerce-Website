import React, { useMemo } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCartProduct } from "../redux/cartSlice";

const FeatureCard = ({ id, img, title, price }) => {
  const productItem = useSelector(state => state.productItem.productItem)
  // console.log(productItem)
  const dispatch = useDispatch()
  const cartProduct = useSelector(state => state.cartProduct)
  const data = productItem.filter(product => product.id === id,[])[0]

  const handleCartProduct = (e)=>{
    e.stopPropagation()
    e.preventDefault()
    dispatch(setCartProduct(data))  
  }

  return (
    <Link to={"/menu/" + id} onClick={()=>window.scrollTo({top: 0, behavior: 'smooth'})}>
      <div
        id={id}
        className="group w-full h-40 min-w-[250px] min-h-[200] max-w-[250px] bg-slate-100 hover:bg-slate-50 hover:drop-shadow-md mt-6 rounded p-1 flex items-center hover:scale-105 transition-all mr-3 cursor-pointer"
      >
        <div className="w-fit  p-3 h-auto  group-hover:scale-110 transition-all relative  box-border">
          <img
            src={img}
            className="w-full h-auto object-cover my-3 box-border"
          />
        </div>
        <div className="py-3 flex h-full flex-col justify-end gap-1 w-full p-3">
          <h3 className="text-base md:text-base font-semibold text-textColor">
            {title}
          </h3>
          <p className="text-base font-semibold text-headingColor">
            <span className="text-base text-red-600">₹</span>
            {price}
          </p>
          <FaCartPlus className="text-xl text-slate-600 hover:text-red-600 cursor-pointer self-end" onClick={handleCartProduct}/>
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;
