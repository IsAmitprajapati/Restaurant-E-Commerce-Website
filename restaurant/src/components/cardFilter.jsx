import React from "react";
import { MdFoodBank } from "react-icons/md";

const CardFilter = ({name,active = false,onClick}) => {

  return (
    <div onClick={onClick} className={`group flex justify-center items-center p-2 ${active ? "bg-red-600" : "bg-white" } hover:bg-red-600 transition-all flex-col rounded min-w-[96px] h-24 cursor-pointer hover:scale-105 mr-3 mt-2 drop-shadow `}>
      <div className="text-3xl rounded-full bg-white p-2 text-red-600 drop-shadow">
        <MdFoodBank />
      </div>
      <h2 className={`mt-1 ${active ? "text-white" : ""} group-hover:text-white capitalize`}>{name}</h2>
    </div>
  );
};


export default CardFilter;
