import React from "react";
import { Link } from "react-router-dom";

const HeaderProduct = ({id,img,decs,price,name}) => {
  return (
    <Link to={"/menu/"+id} onClick={()=>window.scrollTo({top: 0, behavior: 'smooth'})}>
    <div
      key={id}
      className="w-150 md:w-190 mt-6 p-3 md:p-4 md:mt-4 bg-slate-100 hover:bg-slate-50 cursor-pointer backdrop-blur-md rounded-3xl flex flex-col items-center justify-center hover:scale-105 transition-all "
    >
      <img src={img} className="w-20 md:w-28 -mt-8 md:-mt-16" />
      <p className="text-base md:text-xl font-semibold text-textColor">
        {name}
      </p>
      <p className="text-xs md:text-sm text-lighttextGray font-semibold my-1">
        {decs}
      </p>
      <p className="text-base font-semibold text-headingColor">
        <span className="text-base text-red-600">₹</span>
        {price}
      </p>
    </div>
    </Link>
  );
};

export default HeaderProduct;
