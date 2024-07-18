import React, { useState, useEffect } from "react";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  {
    id: 3,
    name: "Large Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "40.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

export default function Cart() {
  const [productCounts, setProductCounts] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = product.quantity;
      return acc;
    }, {})
  );

  const [totalPrice, setTotalPrice] = useState()

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = products.reduce((sum, product) => {
        return sum + product.price * productCounts[product.id];
      }, 0);
      setTotalPrice(total.toFixed(2));
    };

    calculateTotalPrice();
  }, [productCounts]);

  const handleIncrement = (productId) => {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: prevCounts[productId] + 1,
    }));
  };

  const handleDecrement = (productId) => {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: Math.max(prevCounts[productId] - 1, 1),
    }));
  };

  return (
    <section class="bg-gray-50 py-8 antialiased md:py-16">
      <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 class="text-xl font-semibold text-gray-900 sm:text-2xl">
          Your Shopping Cart
        </h2>

        <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div class="space-y-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                >
                  <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <a href="#" class="shrink-0 md:order-1">
                      <img
                        class="h-20 w-20 dark:hidden"
                        src={product.imageSrc}
                        alt={product.imageAlt}
                      />
                      <img
                        class="hidden h-20 w-20 dark:block"
                        src={product.imageSrc}
                        alt={product.imageAlt}
                      />
                    </a>

                    <label for="counter-input" class="sr-only">
                      Choose quantity:
                    </label>
                    <div class="flex items-center justify-between md:order-3 md:justify-end">
                      <div class="flex items-center">
                        <button
                          type="button"
                          id="decrement-button"
                          data-input-counter-decrement="counter-input"
                          class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                          onClick={() => handleDecrement(product.id)}
                        >
                          <svg
                            class="h-2.5 w-2.5 text-gray-900"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          id="counter-input"
                          data-input-counter
                          class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                          placeholder=""
                          value={productCounts[product.id]}
                          readOnly
                          required
                        />
                        <button
                          type="button"
                          id="increment-button"
                          data-input-counter-increment="counter-input"
                          class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                          onClick={() => handleIncrement(product.id)}
                        >
                          <svg
                            class="h-2.5 w-2.5 text-gray-900"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                      <div class="text-end md:order-4 md:w-32">
                        <p class="text-base font-bold text-gray-900">
                          ${(product.price * productCounts[product.id]).toFixed(
                            2
                          )}
                        </p>
                      </div>
                    </div>

                    <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                      <a
                        href="#"
                        class="text-base font-medium text-gray-900 hover:underline"
                      >
                        {product.imageAlt}
                      </a>

                      <div class="flex items-center gap-4">
                        <button
                          type="button"
                          class="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                        >
                          <svg
                            class="me-1.5 h-5 w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M6 18 17.94 6M18 18 6.06 6"
                            />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <p class="text-xl font-semibold text-gray-900">Order summary</p>

              <div class="space-y-4">
                <div class="space-y-2">
                  <dl class="flex items-center justify-between gap-4">
                    <dt class="text-base font-normal text-gray-500">
                      Original price
                    </dt>
                    <dd class="text-base font-medium text-gray-900">
                      ${totalPrice}
                    </dd>
                  </dl>

                  <dl class="flex items-center justify-between gap-4">
                    <dt class="text-base font-normal text-gray-500">
                      Savings
                    </dt>
                    <dd class="text-base font-medium text-green-600">
                      -$299.00
                    </dd>
                  </dl>

                  <dl class="flex items-center justify-between gap-4">
                    <dt class="text-base font-normal text-gray-500">
                      Store Pickup
                    </dt>
                    <dd class="text-base font-medium text-gray-900">$99</dd>
                  </dl>

                  <dl class="flex items-center justify-between gap-4">
                    <dt class="text-base font-normal text-gray-500">Tax</dt>
                    <dd class="text-base font-medium text-gray-900">$799</dd>
                  </dl>
                </div>

                <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt class="text-base font-bold text-gray-900">Total</dt>
                  <dd class="text-base font-bold text-gray-900">$8,191.00</dd>
                </dl>
              </div>

              <a
                href="#"
                class="flex w-full items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Proceed to Checkout
              </a>

              <div class="flex items-center justify-center gap-2">
                <span class="text-sm font-normal text-gray-500"> or </span>
                <a
                  href="#"
                  title=""
                  class="inline-flex items-center gap-2 text-sm font-medium text-blue-700 underline hover:no-underline"
                >
                  Continue Shopping
                  <svg
                    class="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}