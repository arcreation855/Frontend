import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Common/Pagination";
import { Link } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../Common/Constants";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1.0/product/get");
        setProducts(response.data);
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      }
    };

    fetchProducts();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Kapoordani
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {currentProducts.map((product) => (
            <Link to="/product-details">
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    alt="Product Image"
                    src={product.images[0]}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.product.productName}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.product.productColor}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ₹ {product.product.productPrice}
                  </p>
                </div>
              </div>{" "}
            </Link>
          ))}
        </div>
      </div>
      <Pagination
        page={currentPage}
        setPage={setCurrentPage}
        handlePage={handlePageChange}
        totalItems={products.length}
      />
    </div>
  );
};

export default ProductList;
