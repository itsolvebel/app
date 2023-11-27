import React, { useEffect, useState } from "react";
import "../style/transitions.css";
import Image from "next/image"
const Stats = () => {
  const [sizeX, setSizeX] = useState(332);
  const [sizeY, setSizeY] = useState(512);
  const [show, setShow] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const width = window.innerWidth;
        if (
          scrollPosition > 500 &&
          scrollPosition < 950 &&
          width - 400 > sizeY
        ) {
          const newSizeX = sizeX + (scrollPosition - 500) * 0.832;
          const newSizeY = sizeY + (scrollPosition - 500) * 1.28;

          setSizeX(newSizeX);
          setSizeY(newSizeY);
        }
      };

      window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const scroll = () => {
        const item = document.querySelector(".main-div");
        const scrollPosition = window.scrollY;

        if (scrollPosition < 1800) {
          item.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        }

        if (scrollPosition > 800) {
          setShow(true);
        } else {
          setShow(false);
        }
      };

      window.addEventListener("scroll", scroll);
      return () => {
        window.removeEventListener("scroll", scroll);
      };
    }
  }, []);

  return (
    <div className="container-fluid relative flex justify-center lg:h-[1450px]">
      <div className="mt-18 relative mt-8 flex w-[95%] justify-center">

        <div
          className="main-div flex hidden flex-col overflow-hidden rounded-xl border border-[#15B1FE] bg-slate-900 p-10 lg:block"
          style={{ width: sizeY, height: sizeX }}
        >
          <div className="absolute -left-48 top-0 w-[150%]"></div>

          <div
            className={
              show
                ? "flex h-[100%] gap-10 py-10 fade-in"
                : "hidden py-5 fade-out"
            }
          >
            <div className="w-[20%]">
              <h2 className="font-sans text-5xl font-semibold text-[#15B1FE]">
                How it works
              </h2>
              <p className="pt-5 text-sm text-white">
                It is very simple to order with our easy to use user interface
                and ordering system, just create a ticket and follow the steps.
              </p>
            </div>
            <div className="h-[100%] w-[80%] overflow-hidden rounded-xl">
              <Image
                src="/assets/ClientChat.png"
                alt="cient chat"
                className="w-[100%] object-cover"
                width={1200}
                height={897}
              />
            </div>
          </div>
        </div>
        <div className="mt-36 flex h-auto flex-col rounded-xl border border-[#15B1FE] p-5 md:p-10 lg:mt-0 lg:hidden">
          <div className="flex h-auto gap-5 py-5 fade-in sm:py-10 md:gap-10">
            <div className="w-[20%]">
              <h2 className="font-sans text-lg font-semibold  text-[#15B1FE] sm:text-3xl md:text-5xl">
                How it works
              </h2>
            </div>
            <div className="h-[100%] w-[80%] overflow-hidden rounded-xl">
              <Image
                  src="/assets/ClientChat.png"
                  alt="cient chat"
                  className="w-[100%] object-cover"
                  width={1200}
                  height={897}
              />
              <p className="md:text-md pl-1 pt-5 text-xs text-white sm:text-sm">
                It is very simple to order with our easy to use user interface
                and ordering system, just create a ticket and follow the steps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
