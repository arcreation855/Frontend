import React from "react";
import Img1 from "/Images/Img1.jpg";

const Blogs = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="w-3/4 mx-auto">
        <h1 className="text-4xl font-semibold mb-5">Blogs</h1>
        <div>
          <img src={Img1} alt="dummy img" />
          <p>
            <p className="text-lg font-semibold my-3">Multipurpose Use: </p>
            Multipurpose Best Used for diffusion of aroma oils
            and camphor and also as night lamp. If you want to use as aroma
            diffuser than plug it in and switch on the heat button on the
            product. Its comes with in build On Off switch for heating. Ceramic
            & Beautiful Floral Design: Its Ceramic & beautiful floral design.
            Experience an Improved and relaxed mood with Aroma Burner with Night
            Lamp. Floral design may vary due to handcrafted work. 
            <br/>
            <p className="text-lg font-semibold my-3">How to Use:</p>
              1. Put Kapoor in cup. <br/>
              2. Plug it then switch it on , Don't touch it
            white it's on.<br/>
            3.Wait till Kapoor evaporate.
            4. switch it off as soon as Kapoor evaporate.<br/>
            5. Maximum use 25 min wait till gets cold then unplug it. You can use a Night Lamp (Keep heating switch OFF).

            <p className="text-lg font-semibold my-3">Uses & Benefits:</p> Using essential oils or camphor in a diffuser is
            an effective way to improve memory, cognitive function and focus and
            has a positive impact on your overall health. positive enviroament.
            It may help in cough, co  ld ,flu, fever, headache, close nose and
            many heart or lung problems creates positive energy. Easy to Use :
            Easy to use Produce less smoke very easy for cleaning, Heavy Duty
            Coil. 3 Pin Strong Direct plugin system and no hassle of wire. Plug
            and switch on to experience the elegance smell and Creating an
            Exclusive Interior Ambiance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
