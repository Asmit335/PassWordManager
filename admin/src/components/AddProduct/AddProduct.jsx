import React, { useState } from "react";
import upload_area from "../../Assets/upload_area.svg";
import { toast } from "react-toastify";

const AddProduct = () => {
  //test addProduct
  //test push
  const [image, setImage] = useState(false);
  const [productDetail, setProductDetail] = useState({
    title: "",
    image: false,
    category: "electronics",
    price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetail({ ...productDetail, [e.target.name]: e.target.value });
  };

  const Add_product = async () => {
    try {
      // Prepare FormData with product image
      const formData = new FormData();
      formData.append("image", image);
      // Upload image to server
      const uploadResponse = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadResponse.json();
      console.log("Upload Response:", uploadData);
      //   If image upload is successful, add the product
      if (uploadData.success) {
        const productData = { ...productDetail, image: uploadData.imageUrl };
        const addProductResponse = await fetch(
          "http://localhost:3000/allproducts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            productData,
          }
        );
        const addProductData = await addProductResponse.json();
        console.log("Add Product Response:", addProductData);
        // Display success or failure message based on server response
        if (addProductData.success) {
          console.log(productData);
          toast.success("Product Added Successfully.");
          alert("Product Added");
        } else {
          toast.error("Product Failed to Add.");
          alert("Failed to add product");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while adding product");
    }
  };

  return (
    <>
      <div className="add-product mx-auto w-full max-w-3xl px-6 py-8 bg-white rounded-md shadow-md">
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-gray-900 text-base font-semibold mb-2"
          >
            Product Title
          </label>
          <input
            type="text"
            id="name"
            name="title"
            value={productDetail.title}
            onChange={changeHandler}
            placeholder="Type here"
            className="w-full h-12 rounded-md pl-4 border-2 border-gray-300 outline-none text-gray-700 font-sans text-base focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="price"
            className="block text-gray-900 text-base font-semibold mb-2"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productDetail.price}
            onChange={changeHandler}
            placeholder="Input Price"
            className="w-full h-12 rounded-md pl-4 border-2 border-gray-300 outline-none text-gray-700 font-sans text-base focus:border-blue-500 overflow-hidden"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-gray-900 text-base font-semibold mb-2"
          >
            Product Category
          </label>
          <select
            id="category"
            name="category"
            className="w-full h-12 rounded-md pl-4 border-2 border-gray-300 outline-none text-gray-700 font-sans text-base focus:border-blue-500"
            value={productDetail.category}
            onChange={changeHandler}
          >
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="file-input"
            className="block text-gray-900 text-base font-semibold mb-2"
          >
            Product Image
          </label>
          <label htmlFor="file-input" className="block cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              alt="loading"
              className="w-full h-40 rounded-md border-2 border-gray-300 object-contain"
            />
          </label>
          <input
            type="file"
            id="file-input"
            name="image"
            onChange={imageHandler}
            className="hidden"
          />
        </div>

        <button
          className="w-full h-12 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          onClick={() => {
            Add_product();
          }}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default AddProduct;
