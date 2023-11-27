import React, { useState, useEffect, useRef } from "react";
import "../style/transitions.css";
import Slider from "./Slider";
import Lottie from "lottie-react";
import Checklist from "../../../lottie/Checklist.json";

const IntroHeader = () => {
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
    <>
      <div className="container-fluid flex flex h-[100%] w-[100%] flex-col items-center items-center justify-center rounded-xl bg-slate-100 pt-28 text-white md:py-28">
        <div
          className="container-fluid w-[95%] border-b  border-b-slate-900 pb-16 md:w-[90%]"
          ref={(el) => (sectionRefs.current[0] = el)}
        >
          {service && (
            <h2 className="fade-out-from-right md-font-size-lg md-font-size-md md-font-size-sm z-0 text-center leading-none tracking-tight">
              <span className="font-sans text-slate-900">
                Ready to level up your{" "}
              </span>
              <span className="font-serif font-light text-[#15B1FE] underline underline-offset-8">
                idea
              </span>
            </h2>
          )}
          {service && (
            <h2 className="fade-out-from-left md-font-size-lg md-font-size-md md-font-size-sm z-0 text-center font-serif leading-none tracking-tight">
              {" "}
              <span className="font-sans font-normal text-slate-900">
                and make them a{" "}
              </span>{" "}
              <span className="font-serif font-light text-[#15B1FE]  underline underline-offset-8">
                reality
              </span>
            </h2>
          )}
          <h3 className="mt-10 text-center text-xl text-slate-900 md:text-2xl lg:text-3xl">
            We are humans collaborating with humans
          </h3>
        </div>
        <div className="w-100 flex max-w-[1500px] flex-col justify-start py-5 px-5 md:flex-row md:py-20 md:px-20">
          <div className="w-[95%] md:w-[50%]">
            <ul className="flex flex-col items-start justify-start gap-5">
              <li className="flex items-center gap-5">
                <div className="w-[40px] ">
                  <Lottie animationData={Checklist} />
                </div>
                <p className="text-md text-slate-900">
                  Collaborative approach to fully realize your vision.
                </p>
              </li>
              <li className="flex items-center gap-5">
                <div className="w-[40px]">
                  <Lottie animationData={Checklist} />
                </div>
                <p className="text-md text-slate-900">
                  Innovative and practical solutions using the latest
                  technology.
                </p>
              </li>
              <li className="flex items-center gap-5">
                <div className="w-[40px]">
                  <Lottie animationData={Checklist} />
                </div>
                <p className="text-md text-slate-900">
                  Clear communication and transparency throughout project.
                </p>
              </li>
            </ul>
          </div>
          <div className="w-[95%] px-3 md:w-[60%] md:px-10">
            <h4 className="text-md mt-10 font-sans leading-none text-slate-900 md:mt-0 md:text-xl lg:text-3xl">
              Whether you have a new business venture or an existing project
              that needs a fresh perspective, we have the expertise and
              resources to take your ideas to the next level.
            </h4>
          </div>
        </div>
      </div>
      <Slider />
    </>
  );
};

export default IntroHeader;
