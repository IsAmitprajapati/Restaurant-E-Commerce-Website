import React from "react";
import { useDispatch, useSelector } from "react-redux";

const PaymentSummary = ({cartTotal,deliveryCharge,Total,handlePayment}) => {
  
  return (
    <>
      <div className="max-w-sm ml-auto drop-shadow rounded shadow-md overflow-hidden">
        <h3 className="py-3 px-3 border-b bg-red-500 font-bold text-white">
          Price Summary
        </h3>
        <div className="py-2 px-3 text-base flex justify-between">
          <p>Cart Total</p>
          <p>₹{cartTotal}</p>
        </div>
        <div className="py-2 px-3 text-base flex justify-between">
          <p>Delivery Charge</p>
          <p>₹{deliveryCharge}</p>
        </div>
        <div className="py-2 px-3 text-base flex justify-between font-bold">
          <p>Total</p>
          <p>₹{Total}</p>
        </div>
      </div>

      <div className="max-w-sm ml-auto drop-shadow rounded shadow-md overflow-hidden mt-4">
        <a href="">
          <button
            type="button"
            className="text-center w-full py-2 font-bold bg-blue-500 text-white"
            onClick={handlePayment}
          >
            Payment
          </button>
        </a>
      </div>
    </>
  );
};

export default PaymentSummary;
