import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
// import { RxDotFilled } from 'react-icons/rx';
import { Link } from "react-router-dom";

function Carousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]);

  // const goToSlide = (slideIndex) => {
  //   setCurrentIndex(slideIndex);
  // };

  return (
    <div className="w-full h-[85vh] m-auto relative group">
      {/* <Link to={slides[currentIndex].pageLink}> */}
        <div
          style={{
            backgroundImage: `url(${slides[currentIndex].url})`,
            backgroundSize: "cover",
          }}
          className="w-full h-full rounded bg-center bg-cover duration-500"
        >
          <button className="m-10 text-5xl text-green-900 font-bold">
            {slides[currentIndex].service}
          </button>
          <br />
          <button className="bg-green-900 px-7 py-1 text-white ml-10 font-bold rounded-2xl">
            services
          </button>
        </div>{" "}
      {/* </Link> */}

      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={25} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={25} />
      </div>

      {/* <div className='flex top-4 justify-center py-2'>
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className='text-2xl cursor-pointer'
            >
              <RxDotFilled />
            </div>
          ))}
        </div> */}
    </div>
  );
}

export default Carousel;
