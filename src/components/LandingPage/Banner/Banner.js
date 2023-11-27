import React, { useState } from "react";
import "../style/fontsize.css";
import { Typewriter } from "react-simple-typewriter";
import Stats from "../Introduction/Introduction";
import "../style/transitions.css";
import { BsSearch } from "react-icons/bs";
import BgLineAnimation from "./BgLineAnimation";

const Banner = () => {
  const [service, setService] = useState();

  return (
    //TODO deze lijnen mogen niet over andere delen komen van de pagina (momenteel komen deze bv. boven de search box)
    <div className="flex h-screen flex-col items-center justify-center bg-slate-900">
      <div className="absolute top-[500px] w-full md:top-[400px]">
        <BgLineAnimation />
      </div>

      <div className="container-fluid flex w-full flex-col items-center pt-32 text-white md:pt-40">
        <h2 className="fade-out-from-left lg-font-size-lg lg-font-size-md lg-font-size-sm text-center leading-none tracking-tight">
          <span className="font-serif font-light text-[#15B1FE]">
            Together,
          </span>{" "}
          <span className="font-sans">we </span>
        </h2>
        <h2 className="fade-out-from-right lg-font-size-lg lg-font-size-md lg-font-size-sm text-center font-serif leading-none tracking-tight">
          {" "}
          <span className="font-sans font-normal">make dreams come</span>{" "}
          {/* TODO kleuren voor tekst algemeen maken */}
          <span className="font-serif font-light text-[#15B1FE]">true.</span>
        </h2>
        <form className="w-max-[400px] w-[90%] md:w-[50%] lg:w-[30%]">
          <div className="mt-5 text-center text-2xl">
            <span>Looking for</span>
            <span className="ml-2 mt-1 inline-block text-white">
              <Typewriter
                words={[
                  "a website?",
                  "a logo?",
                  "graphic design?",
                  "a digital service?",
                  "a marketing expert?",
                  "a writer?",
                  "a photographer?",
                  "a video?",
                  "animations?",
                  "motion design?",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </div>
          <div className="sm:w-min-[300px] mt-5 flex justify-center rounded-full bg-white px-2 md:min-w-[350px]">
            <input
              type="search"
              value={service}
              className="w-full rounded-full px-5  py-3 text-slate-900 outline-none"
              placeholder="What service are you looking for?"
              onChange={(e) => setService(e.target.value)}
            />
            <button>
              <BsSearch className="mr-5 text-slate-900 duration-300 ease-in-out hover:scale-125" />
            </button>
          </div>
        </form>

        <button className="mx-auto mt-12 flex rounded-full border-2 border-white bg-slate-900 px-6 py-3 text-center text-lg  text-white hover:scale-105 hover:duration-500">
          <span className="font-sans font-normal">Let&apos;s work together</span>
        </button>

        <p className="ms:text-md mt-12 block w-[75%] text-center font-sans text-sm text-[#15B1FE] md:w-[55%]">
          At itsolve safety is our top priority, delivering services with utmost
          quality. Our commitment shines through, day and night. Ensuring a
          better & reliable system, leaving competitors out of sight.
        </p>
      </div>
    </div>
  );
};

export default Banner;
