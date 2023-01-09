// import { async } from "@firebase/util";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import FeatureCard from "./FeatureCard";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { useRef } from "react";
import Loading from "../utils/Loading";

const Feature = () => {
    const notHaveData = new Array(7).fill(null)
    // console.log(notHaveData)

  const productItem = useSelector((state) => state.productItem.productItem);
  const productLoading = useSelector(
    (state) => state.productItem.productLoading
  );
  // console.log(productItem);
  const data = useMemo(
    () => productItem.filter((el) => el.category.toLowerCase() == "fruits", []),
    [productItem]
  );
  // console.log(data);

  const fetureRef = useRef();

  const nextPart = () => {
    fetureRef.current.scrollLeft += 250;
  };
  const prevePart = () => {
    fetureRef.current.scrollLeft -= 250;
  };


  

  return (
    <div className="p-2  md:p-4 my-4">
      <div className="flex items-center justify-between">
        <h2 className=" capitalize text-lg md:text-2xl  font-semibold before:rounded-lg relative before:absolute before:-bottom-2 before:content before:left-0 before:w-32 before:h-1 before:bg-red-500 transition-all ease-in-out duration-100">
          Our Fresh & Healthy Fruits
        </h2>
        <div className="relative hidden md:flex justify-between top-0 bottom-0 text-2xl items-center ">
          <button
            className="p-1 bg-slate-300 hover:bg-slate-400 , px-0 opacity-60 text-2xl rounded mr-3"
            onClick={prevePart}
          >
            <GrFormPrevious />
          </button>
          <button
            className="p-1 bg-slate-300 hover:bg-slate-400  px-0 opacity-60 text-2xl rounded transition-all"
            onClick={nextPart}
          >
            <GrFormNext />
          </button>
        </div>
      </div>
      <div
        className="w-full overflow-hidden overflow-x-auto scrollbar-none relative"
        ref={fetureRef}
      >
        <div className="flex">
          {productLoading
            ? new Array(7).fill(null).map((el, index) => {
                return (
                  <div  key={index} className="bg-slate-100  min-w-[250px] min-h-[200] m-2 my-6 p-16 flex justify-center items-end">
                    <Loading />
                  </div>
                );
              })
            : data.map((el) => {
                return (
                  <FeatureCard
                    key={el.id}
                    id={el.id}
                    img={el.imgURL}
                    title={el.title}
                    price={el.price}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Feature;
