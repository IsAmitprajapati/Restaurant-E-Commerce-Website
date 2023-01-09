import React from 'react'
import { Link } from 'react-router-dom'

const RecentUploadCard = ({id,img,name,decs,price}) => {
  return (
    <Link to={"/menu/" + id} onClick={()=>window.scrollTo({top: 0, behavior: 'smooth'})}>
    <div
      key={id}
      className="w-190 min-w-[140px] md:w-190 md:min-w-[190px] mt-6 p-3   md:p-4 md:mt-4 bg-slate-100 hover:bg-slate-50 cursor-pointer backdrop-blur-md rounded-3xl flex flex-col items-center justify-center hover:scale-105 transition-all "
    >
      <img src={img} className="w-20 md:w-32 h-28 mb-2" />
      <p className="text-base md:text-base font-semibold text-textColor text-center">
        {name}
      </p>
      <p className="text-xs md:text-sm text-lighttextGray font-semibold my-1">
        {decs}
      </p>
      <p className="text-base font-semibold text-headingColor">
        <span className="text-base text-red-600">₹</span>
        {price}
      </p>
      {/* <FaCartPlus className="text-xl text-slate-600 hover:text-red-600 cursor-pointer self-end"/> */}
    </div>
    </Link>
  )
}

export default RecentUploadCard