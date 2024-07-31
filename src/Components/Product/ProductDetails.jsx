import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProductDetails() {

  const [productData, setProductData] = useState({
    product: {
      productName: "",
      productPrice: "",
      productColor: "",
      productDescription: "",
      productHeight: "",
      productWidth: "",
      productLength: "",
    },
    images: []
  });

  const productId = localStorage.getItem("product_id");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1.0/product/get/${productId}`);
        setProductData(response.data);
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      }
    };

    fetchProducts();
  }, [productId]);

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li className="text-sm">
              <div
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {productData.product.productName}
              </div>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-4 lg:aspect-h-3 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              alt="productImage"
              src={productData.images[0]}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            {productData.images[1] && (
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  alt="productImage"
                  src={productData.images[1]}
                  className="h-full w-full object-cover object-center"
                />
              </div>)}
            {productData.images[2] && (
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  alt="productImage"
                  src={productData.images[2]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            )}
          </div>
          {productData.images[3] && (
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                alt="productImage"
                src={productData.images[3]}
                className="h-full w-full object-cover object-center"
              />
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {productData.product.productName}
            </h1>
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <span className="text-green-600 font-semibold">Special price</span>
            <p className="text-3xl tracking-tight text-gray-900 font-semibold">
              ₹{productData.product.productPrice} <s className="text-xl text-gray-500">₹699</s>
            </p>

            <form className="mt-10">
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div className="space-y-6">
              <p className="text-base text-gray-900">{productData.product.productDescription}</p>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  <li className="text-gray-400">
                    <span className="text-gray-700">Color: {productData.product.productColor}</span>
                  </li>
                  <li className="text-gray-400">
                    <span className="text-gray-700">Height: {productData.product.productHeight}cm</span>
                  </li>
                  <li className="text-gray-400">
                    <span className="text-gray-700">Width: {productData.product.productWidth}cm</span>
                  </li>
                  <li className="text-gray-400">
                    <span className="text-gray-700">Length: {productData.product.productLength}cm</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
