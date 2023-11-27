import React, { useEffect, useRef, useState } from "react";
import "../style/fontsize.css";
import "../style/transitions.css";
import Cards from "./Cards";

const Service = () => {
  const sectionRefs = useRef([]);
  const [service, setService] = useState(false);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setService(true);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection);

    sectionRefs.current.forEach((ref) => {
      observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="my-24 px-2 md:px-10 text-white h-[100%] ">
      <h2 className="text-2xl tracking-wide mb-5 text-[#15B1FE] ml-5 md:ml-10">
        Service Team
      </h2>

      <div
        className="w-[90%] sm:w-[75%] lg:max-w-[1000px] m-auto tracking-tighter leading-none"
        ref={(el) => (sectionRefs.current[0] = el)}
      >
        {service && (
          <h2 className="text-9xl md-font-size-sm md-font-size-md md-font-size-lg fade-out-from-left">
            We make the
          </h2>
        )}
        {service && (
          <h2 className="text-end md-font-size-sm md-font-size-md md-font-size-lg fade-out-from-right">
            complex <span className="font-serif text-[#15B1FE]">simple.</span>
          </h2>
        )}
      </div>

      <div className="container-fluid w-full">
        <Cards />
      </div>
    </div>
  );
};

export default Service;
