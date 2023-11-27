"use client"
import React, { useState, useEffect } from "react";
// import "animate.css";
import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa";
import HamMenu from "./HamMenu";
import "../style/services.css";
import DropDowns from "./DropDowns";
import Link from "next/link";
import Image from "next/image"

const Header = () => {
  const [services, setServices] = useState(false);
  const [itsolve, setITsolve] = useState(false);
  const [icon, setIcon] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [header, setHeader] = useState(true);
  const [close, setclose] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth < 1024) {
          setServices(false);
          setITsolve(false);
        }
      };
      handleResize();
      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const isScrolledUp = currentScrollPos > prevScrollPos;

        if (isScrolledUp) {
          setServices(false);
          setITsolve(false);
          if (window.pageYOffset > 50) {
            setclose(true);
            setHeader(false);
          }
        } else {
          setHeader(true);
        }

        setPrevScrollPos(currentScrollPos);
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [prevScrollPos]);

  const toggleServices = () => {
    setServices(!services);
    setITsolve(false);
  };

  const toggleITSolve = () => {
    setITsolve(!itsolve);
    setServices(false);
  };

  const toggleIcon = () => {
    setIcon(!icon);
  };

  return (
    <>
      <div
        className={
          !header
            ? "container-fluid fixed top-0 left-0 z-50 h-[90px] w-[100%] -translate-y-full transition-transform duration-500 ease-in-out"
            : "container-fluid fixed top-0 left-0 z-50 h-[90px] w-[100%] translate-y-0 transition-transform duration-500 ease-in"
        }
      >
        <div className="container-fluid nav-container flex w-[100%] items-center justify-between bg-none px-5 py-5 backdrop-blur-xl md:px-16">
          <div className="flexing h-[35px] md:h-[50px]">
            <Link href="/" className={"block"}>
              <Image
                className="image h-[100%] cursor-pointer"
                src="/assets/LogoWhite.png"
                alt=""
                width={"132"}
                height={"50"}
              />
            </Link>
            <div
              className="mantine-Badge-root mantine-1c0777x bg-slate-700"
              style={{
                border: "2px solid orange",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              <span className="mantine-1t45alw mantine-Badge-inner">BETA</span>
            </div>{" "}
          </div>
          <div className="static flex items-center justify-center text-white ">
            <ul className="hidden cursor-pointer gap-2 text-lg lg:flex">
              <li
                className="flex items-center gap-2 rounded-md py-2 px-4 tracking-wide text-[#15B1FE] hover:bg-blue-200"
                onClick={toggleServices}
              >
                <span className="font-sans font-normal tracking-tight">
                  services
                </span>
                <FaAngleDown
                  className={
                    !services
                      ? "rotate-0 transition-transform duration-700 ease-in-out"
                      : "rotate-180 transition-transform duration-700 ease-in-out"
                  }
                />
              </li>
              <li
                className="flex items-center gap-2 rounded-md py-2 px-4 tracking-wide text-[#15B1FE] hover:bg-blue-200"
                onClick={toggleITSolve}
              >
                <span className="font-sans font-normal tracking-tight">
                  itsolve
                </span>
                <FaAngleDown
                  className={
                    !itsolve
                      ? "rotate-0 transition-transform duration-700 ease-in-out"
                      : "rotate-180 transition-transform duration-700 ease-in-out"
                  }
                />
              </li>
              <li className="gap-2 rounded-md py-2 px-4 tracking-wide text-[#15B1FE] hover:bg-blue-200">
                <span className="font-sans font-normal tracking-tight">
                  <Link href="/contact">contact</Link>
                </span>
              </li>
              <li className="flex items-center gap-2 rounded-md py-2 px-4 tracking-wide text-[#15B1FE] hover:bg-blue-200">
                <span className="font-sans font-normal tracking-tight">en</span>
                <FaAngleDown />
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-6">
            <div className="login flex items-center">
              <Link
                className="mr-2 rounded-full py-2 px-3 font-sans font-medium text-[#15B1FE] hover:bg-blue-200 sm:text-sm md:px-6 "
                href="/login"
              >
                Log in
              </Link>
              <Link
                className="text-md rounded-full bg-[#15B1FE]  py-2  px-3 text-white hover:scale-105 hover:duration-300 sm:text-sm md:px-6"
                href="/register"
              >
                Sign Up
              </Link>
            </div>
            <div
              className=" text-2xl text-white sm:inline-block lg:hidden"
              onClick={toggleIcon}
            >
              {icon ? <FaBars /> : <FaTimes />}
            </div>
          </div>
        </div>
      </div>

      {!icon ? (
        <></>
      ) : (
        <DropDowns services={services} itsolve={itsolve} fun={setITsolve} />
      )}

      <div className="lg:hidden">
        <HamMenu
          icon={icon}
          set_icon={setIcon}
          toggle1={setServices}
          toggle2={setITsolve}
          isclosed={close}
        />
      </div>
    </>
  );
};

export default Header;
