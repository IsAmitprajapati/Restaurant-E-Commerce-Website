import React from "react";
import { MdOutlineAdd, MdOutlineRemove ,MdOutlineDelete} from "react-icons/md";
import { useDispatch } from "react-redux";
import { incrementQtyProduct, decrementQtyProduct,deleteCartProduct } from "../redux/cartSlice";

const CartAddedItem = ({ id, img, title, price, qty, total }) => {
  const dispatch = useDispatch();

  
  return (
    <div className="border h-36 rounded flex w-full  ">
      <div className="w-56 min-w-[100px] bg-slate-300 rounded  box-border overflow-hidden">
        <img className="w-full p-3 box-border object-cover" src={img} />
      </div>
      <div className="px-3 md:p-3 w-full min-w-210">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:whitespace-nowrap font-semibold text-slate-500">
            {title}
          </h1>
          <div onClick={()=>dispatch(deleteCartProduct(id))} className="text-slate-500 hover:text-white cursor-pointer hover:bg-red-600 p-1 rounded-full hover:scale-105 transition-all">
            <MdOutlineDelete />
          </div>
        </div>
        <p className="text-base font-semibold text-headingColor">
          <span className="text-base text-red-600">₹</span>
          {price}
        </p>
        <div className="flex my-3 md:items-center flex-col md:flex-row jus">
          <div className="flex items-center">
            <button
              className="w-auto  bg-blue-300 px-2 py-1 rounded"
              onClick={() => dispatch(decrementQtyProduct(id))}
            >
              <MdOutlineRemove />
            </button>
            <button className="font-semibold px-2 py-1">{qty}</button>
            <button
              className="w-auto  bg-blue-300 px-2 py-1 rounded"
              onClick={() => dispatch(incrementQtyProduct(id))}
            >
              <MdOutlineAdd />
            </button>
          </div>
          <div className=" flex ml-0 md:ml-auto md:px-3 items-center">
            <p>Total : </p>
            <span className=" font-semibold px-2 py-1 text-slate-600">
              <span>₹</span>
              {total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartAddedItem;
