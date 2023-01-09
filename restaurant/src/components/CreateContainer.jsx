import React, { useState } from "react";
import { MdDriveFileRenameOutline, MdOutlineDelete } from "react-icons/md";
import { categories } from "../database/headerData";
import {
  MdCloudUpload,
  MdAccountBalanceWallet,
  MdSource,
} from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import Loading from "../utils/Loading";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { saveProductItem } from "../utils/firebaseFunctions";
import RecentUpload from "./RecentUpload";

const CreateContainer = () => {
  const [product, setProduct] = useState({
    productName: "",
    productCatogories: "",
    productImage: "",
    productCalories: "",
    productPrice: "",
    productDesc: "",
  });
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [msg, setMsg] = useState("Amit Prajapti");
  const [danger, setDanger] = useState("success");
  const [isMsg, setIsMsg] = useState(false);

  const handleOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProduct((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const uploadImage = (e) => {
    setIsLoadingImage(true);
    const file = e.target.files[0];
    console.log(file);

    const storegeRef = ref(storage, `Images/${Date.now()}-${file.name}`);
    const uploadImage = uploadBytesResumable(storegeRef, file);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setMsg("Error While uploading : Try Again !!!");
        setDanger("danger");
        setIsMsg(true);

        setTimeout(() => {
          setIsMsg(false);
          setIsLoadingImage(false);
        }, 5000);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
          setProduct((preve) => {
            return {
              ...preve,
              productImage: downloadURL,
            };
          });
          setIsLoadingImage(false);
          setIsMsg(true);
          setMsg("Image uploaded successfully");
          setDanger("success");

          setTimeout(() => {
            setIsMsg(false);
            setIsLoadingImage(false);
          }, 5000);
        });
      }
    );
  };

  const handleDelete = () => {
    setIsLoadingImage(true);
    const deleteRef = ref(storage, product.productImage);
    deleteObject(deleteRef).then(() => {
      setProduct((preve) => {
        return {
          ...preve,
          productImage: "",
        };
      });
      setIsLoadingImage(false);
      setIsMsg(true);
      setMsg("Image delete successfully");
      setDanger("success");

      setTimeout(() => {
        setIsMsg(false);
        setIsLoadingImage(false);
      }, 5000);
    });
  };

  const saveProductDetails = () => {
    setIsLoadingImage(true);
    try {
      if (
        !product.productName ||
        !product.productImage ||
        !product.productPrice ||
        !categories
      ) {
        setIsMsg(true);
        setMsg("Required fields can't be empty!!");
        setDanger("danger");

        //not display alert after 5sec
        setTimeout(() => {
          setIsMsg(false);
          setIsLoadingImage(false);
        }, 5000);
      } else {
        const productData = {
          id: `${Date.now()}`,
          title: product.productName,
          imgURL: product.productImage,
          category: product.productCatogories,
          calories: product.productCalories,
          qty: 1,
          price: product.productPrice,
          desc: product.productDesc,
        };
        saveProductItem(productData);
        setIsLoadingImage(false);
        setIsMsg(true);
        setMsg("Data Up successfully!!");
        setDanger("success");
        clearData();
        setTimeout(() => {
          setIsMsg(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      setIsMsg(true);
      setMsg("Error While uploading !! Try Again");
      setDanger("danger");
      clearData();

      setTimeout(() => {
        setIsMsg(false);
        setIsLoadingImage(false);
      }, 4000);
    }
  };

  function clearData() {
    setProduct((preve) => {
      return {
        ...preve,
        productName: "",
        productCatogories: "Select categories",
        productImage: "",
        productCalories: "",
        productPrice: "",
        productDesc: "",
      };
    });
  }

  console.log(product);
  return (
    <div className="py-5 md:py-10">
      <div className="w-11/12 max-w-2xl m-auto  bg-slate-100 p-4 rounded shadow-md relative py-10 box-border">
        <div className="absolute top-0 left-0 right-0">
          {isMsg && (
            <>
              <motion.p
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className={`text-white text-center p-1 rounded ${
                  danger === "success" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {msg}
              </motion.p>
            </>
          )}
        </div>
        <div className="border-black border-b-2 border-solid flex items-center box-border">
          <MdDriveFileRenameOutline className="text-2xl" />
          <input
            type="text"
            placeholder="Enter the name"
            name="productName"
            value={product.productName}
            onChange={handleOnChange}
            className="px-3 py-1 w-full bg-transparent text-slate-600 border-none outline-none text-base box-border"
          />
        </div>
        <div className="box-border">
          <select
            className="w-full my-3 py-2 px-3 text-base bg-slate-100 border-2 border-solid rounded box-border"
            name="productCatogories"
            onChange={handleOnChange}
            value={product.productCatogories}
          >
            <option value="Other">Select categories</option>
            {categories &&
              categories.map((el) => (
                <option value={el.url} key={el.id}>
                  {el.name}
                </option>
              ))}
          </select>
        </div>
        <label htmlFor="uploadImage">
          <div className=" relative w-full border-2 border-solid box-border h-60 p-1 flex justify-center items-center text-7xl text-slate-500 flex-col cursor-pointer">
            {product.productImage ? (
              <>
                <img
                  src={product.productImage}
                  className="w-full h-full object-content box-border"
                />
                <button
                  onClick={handleDelete}
                  className="absolute bottom-0 right-0 box-border text-white p-1 rounded-t-full rounded-l-full cursor-pointer text-xl bg-red-600"
                >
                  <MdOutlineDelete />
                </button>
              </>
            ) : isLoadingImage ? (
              <Loading />
            ) : (
              <>
                <MdCloudUpload />
                <input
                  type="file"
                  id="uploadImage"
                  className="w-0 h-0"
                  name="productImage"
                  onChange={uploadImage}
                />
                <p className="text-xl">Click here to upload</p>
              </>
            )}
          </div>
        </label>
        <div className="md:flex md:gap-8">
          <div className="border-black border-b-2 border-solid flex items-center my-3 flex-1">
            <MdAccountBalanceWallet className="text-2xl" />
            <input
              type="text"
              placeholder="Enter the Calories"
              name="productCalories"
              value={product.productCalories}
              onChange={handleOnChange}
              className="px-3 py-1 w-full bg-transparent text-slate-600 border-none outline-none text-base box-border"
            />
          </div>
          <div className="border-black border-b-2 border-solid flex items-center my-3 flex-1">
            <BiDollar className="text-2xl" />
            <input
              type="text"
              placeholder="Enter the Prices"
              name="productPrice"
              value={product.productPrice}
              onChange={handleOnChange}
              className="px-3 py-1 w-full bg-transparent text-slate-600 border-none outline-none text-base box-border"
            />
          </div>
        </div>
        <div className="border-black border-b-2 border-solid flex items-center my-3 flex-1">
          <MdSource className="text-2xl" />
          <textarea
            type="text"
            placeholder="Enter the description"
            name="productDesc"
            value={product.productDesc}
            onChange={handleOnChange}
            className="px-3 py-1 w-full bg-transparent text-slate-600 border-none outline-none text-base resize-none box-border"
          ></textarea>
        </div>

        <button
          type="button"
          onClick={saveProductDetails}
          className="w-full bg-slate-300 hover:bg-slate-200 text-base p-2 rounded box-border"
        >
          Save
        </button>
      </div>

      <div className="my-7 p-2 md:p-4">
        <h1 className="capitalize text-lg md:text-2xl  font-semibold before:rounded-lg relative before:absolute before:-bottom-2 before:content before:left-0 before:w-32 before:h-1 before:bg-red-500 transition-all ease-in-out duration-100">
          Recent Upload
        </h1>
        <div className="flex ">
          <RecentUpload />
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
