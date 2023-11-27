import React from "react";
import "../style/fontsize.css";

const UnleashVision = () => {
  return (
    <div className="container-fluid w-full h-full p-5 md:p-10 mt-10 max-w-[1700px]">
      <div className="flex flex-col justify-center intems-center sm-font-size-sm sm-font-size-md sm-font-size-lg text-white w-full h-full text-center border border-[#15B1FE] rounded-xl py-5 md:py-10 lg:py-20">
        <span className="leading-none mb-3">
          Unleash your{" "}
          <span className="text-[#15B1FE] font-serif">vision,</span>
        </span>
        <span className="leading-none">
          and let the <span className="text-[#15B1FE] font-serif">magic</span>{" "}
          begin!
        </span>
        <div className="flex justify-center items-center my-3 gap-3">
          <button className="text-sm md:text-lg border border-[#15B1FE] hover:bg-slate-950 py-3 px-5 rounded-full hidden mx-3 md:mx-5 mt-2 md:mt-3 md:inline-block">
            create your ticket
          </button>
        </div>
        <div className="block w-full mt-3">
          <button className="text-sm md:text-lg border border-[#15B1FE] hover:bg-slate-950 py-3 px-5 rounded-full inline-block mx-3 md:mx-5 mt-2 md:mt-3 md:hidden max-w-[150px] text-center">
            create your ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnleashVision;
