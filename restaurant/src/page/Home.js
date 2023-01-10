import React from "react";
import { useSelector } from "react-redux";
import DeliveryImage from "../assest/img/delivery.png";
import HeaderProduct from "../components/HeaderProduct";
import { headerData } from "../database/headerData";
const Home = () => {
  const notHaveData = new Array(7).fill(null)
    // console.log(notHaveData)

  const productItem = useSelector((state) => state.productItem.productItem);
  const productLoading = useSelector(
    (state) => state.productItem.productLoading
  );

  // console.log(productItem)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 overflow-hidden p-2  md:p-4">
      <div className="flex-1 flex flex-col items-start  justify-center gap-5 py-3">
        <div className="flex items-center gap-2 justify-center bg-red-200 py-1 px-3 rounded-full">
          <p className="text-sm font-semibold text-red-800">Bike Delivery</p>
          <div className="w-7 h-7 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={DeliveryImage}
              className="w-full h-full object-contain"
              alt="Delivery"
            />
          </div>
        </div>

        <p className="text-4xl font-bold tracking-wider text-headingColor md:text-5xl lg:text-6xl">
          The Fasted Delivery in
          <span className="text-red-600 text-4xl md:text-5xl lg:text-6xl">
            {" "}
            Your Home
          </span>
        </p>

        <p className="text-base text-color text-center md:text-left md:w-4/5">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
          laboriosam dolor, voluptas aliquid expedita doloremque? Ab minima
          reiciendis delectus in deleniti. Quas fugiat rem ipsam repudiandae
          illo ducimus non ad!
        </p>

        <button
          type="button"
          className="bg-gradient-to-br from-red-400 to-red-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out font-semibold  duration-300 flex justify-center md:justify-self-start hover:scale-105 "
        >
          Order Now
        </button>
      </div>

      <div className="p-10 md:pt-10  flex-1 designHomeRight h-full px-2 ">
        <div className="flex flex-wrap justify-center items-center gap-1 md:gap-6">
          {headerData &&
            headerData.map((el) => {
              return (
                <HeaderProduct
                  key={el.id}
                  id={el.id}
                  name={el.name}
                  img={el.img}
                  decs={el.decs}
                  price={el.price}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
