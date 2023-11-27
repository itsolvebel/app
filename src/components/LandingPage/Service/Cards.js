import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Lottie from "lottie-react";
import communication from "../../../lottie/communication.json";
import securePayment from "../../../lottie/secure-payment.json";
import defineServices from "../../../lottie/define-services.json";

const Card = ({ animationData, title, description, style }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="rotate flex w-[90%] flex-col items-center rounded-xl border border-[#15B1FE] p-4 transition-transform duration-500 ease-in-out hover:-translate-y-5 hover:bg-slate-800 md:w-[32.5%] md:p-6 md:py-10 lg:p-10 lg:py-14"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-[100%] max-h-[280px] w-[100%] max-w-[200px] items-center justify-center overflow-hidden py-3 lg:py-10">
        <Lottie animationData={animationData} style={style} />
      </div>
      <div className="s-font-size-md s-font-size-lg w-[100%] tracking-tight text-white">
        <span className="font-serif font-light">{title}</span>
      </div>
      <p className="mt-5 min-h-[60px] border-b border-[#15B1FE] text-xs text-[#15B1FE] sm:min-h-[70px] md:min-h-[110px] lg:min-h-[100px] lg:text-sm">
        {description}
      </p>
      <span className="w-[100%]">
        <FaPlus className="plus mt-5" />
      </span>
    </div>
  );
};

const Cards = () => {
  return (
    <div>
      <div className="h-min-[500px] my-[50px] flex w-[100%] flex-col items-center justify-around gap-5 px-0 pt-10 md:my-[100px] md:flex-row md:gap-0 lg:px-5">
        <Card
          animationData={defineServices}
          title="Define Services"
          description="Our team defines clear and actionable deliverables, ensuring that we deliver quality work on time, every time."
        />
        <Card
          animationData={communication}
          title="Clear Communication"
          description="We believe that communication is key to any successful project. That's why we keep you in the loop every step of the way, so you always know what's going on."
        />
        <Card
          animationData={securePayment}
          title="Payment Protection"
          description="We provide secure and reliable payment options. Your satisfaction is our top priority, and we are committed to providing fair and transparent pricing."
          style={{ transform: "scale(1.6)" }}
        />
      </div>
    </div>
  );
};

export default Cards;
