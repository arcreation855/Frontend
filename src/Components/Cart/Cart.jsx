import React, { useState, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";
import { LuMinus } from "react-icons/lu";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [productCounts, setProductCounts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const loginId = localStorage.getItem("loginId");
  const token = localStorage.getItem("jwtToken");

  const deliveryCharge = 50;

  const grandTotal = Number(totalPrice) + deliveryCharge;

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1.0/user/cart/get/${loginId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.products) {
          const fetchedProducts = response.data.products.map((p) => ({
            id: p.product.id,
            name: p.product.productName,
            color: p.product.productColor,
            price: p.product.productPrice.toFixed(2),
            quantity: response.data.productsCount[p.product.id],
            imageSrc: p.images[0],
            imageAlt: p.product.productName,
          }));

          setProducts(fetchedProducts);
          setProductCounts(response.data.productsCount);
          setTotalPrice(response.data.finalPrice.toFixed(2));
        } else {
          setProducts([]);
          setProductCounts({});
          setTotalPrice(0);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, [loginId]);

  const handleIncrement = (productId) => {
    setProductCounts((prevCounts) => {
      const newCounts = { ...prevCounts, [productId]: prevCounts[productId] + 1 };
      updateTotalPrice(newCounts);
      return newCounts;
    });
  };

  const handleDecrement = (productId) => {
    setProductCounts((prevCounts) => {
      const newCounts = { ...prevCounts, [productId]: Math.max(prevCounts[productId] - 1, 1) };
      updateTotalPrice(newCounts);
      return newCounts;
    });
  };

  const handleRemove = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1.0/user/cart/update`,
        {
          productId,
          userId: loginId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.message === "Product removed from cart") {
        setProducts((prevProducts) => {
          const newProducts = prevProducts.filter((product) => product.id !== productId);
          updateTotalPrice(productCounts, newProducts);
          return newProducts;
        });
        setProductCounts((prevCounts) => {
          const newCounts = { ...prevCounts };
          delete newCounts[productId];
          updateTotalPrice(newCounts);
          return newCounts;
        });
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const updateTotalPrice = (counts, productsToUpdate = products) => {
    const total = productsToUpdate.reduce((sum, product) => sum + product.price * counts[product.id], 0);
    setTotalPrice(total.toFixed(2));
  };

  return (
    <section className="bg-gray-100 py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Your Shopping Cart</h2>

        {products.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {products.map((product) => (
                  <div key={product.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <a href="#" className="shrink-0 md:order-1">
                        <img className="h-20 w-20 dark:hidden" src={product.imageSrc} alt={product.imageAlt} />
                        <img className="hidden h-20 w-20 dark:block" src={product.imageSrc} alt={product.imageAlt} />
                      </a>

                      <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button
                            type="button"
                            id="decrement-button"
                            data-input-counter-decrement="counter-input"
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                            onClick={() => handleDecrement(product.id)}
                          >
                            <LuMinus />
                          </button>
                          <input
                            type="text"
                            id="counter-input"
                            data-input-counter
                            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                            placeholder=""
                            value={productCounts[product.id]}
                            readOnly
                            required
                          />
                          <button
                            type="button"
                            id="increment-button"
                            data-input-counter-increment="counter-input"
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                            onClick={() => handleIncrement(product.id)}
                          >
                            <FiPlus />
                          </button>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900">
                            ₹{(product.price * productCounts[product.id]).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <a href="#" className="text-base font-medium text-gray-900 hover:underline">
                          {product.imageAlt}
                        </a>

                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                            onClick={() => handleRemove(product.id)}
                          >
                            <RxCross2 className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <p className="text-xl font-semibold text-gray-900">Order summary</p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">Original price</dt>
                      <dd className="text-base font-medium text-gray-900">₹{totalPrice}</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">Delivery Charges</dt>
                      <dd className="text-base font-medium text-gray-900">₹{deliveryCharge}</dd>
                    </dl>

                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-gray-900">₹{grandTotal}</dd>
                  </dl>
                </div>

                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Proceed to Checkout
                </a>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500"> or </span>
                  <Link to={"/shop"}>
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 underline hover:no-underline"
                    >
                      Continue Shopping
                      <FaArrowRightLong />
                    </div></Link>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
