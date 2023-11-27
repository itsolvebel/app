import { React, useEffect, useState } from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import Graphics from "../../../lottie/Graphic&Design.json";
import Video from "../../../lottie/video.json";
import Programming from "../../../lottie/programming.json";
import "./DropDown.css";

const DropDowns = ({ services, itsolve, fun }) => {
  const [Ismobile, setIsmobile] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 775) {
        setIsmobile(true);
      }
    }
  }, []);
  function closebar() {
    console.log("Close bar");
    fun(false);
  }
  return (
    <>
      {Ismobile ? (
        <div>
          <div
            className={
              !services
                ? "fixed left-0 top-0 z-40 h-[100vh] min-h-[570px] w-[100%] -translate-y-full bg-slate-900 transition-transform duration-700 ease-in-out"
                : "fixed left-0 top-0 z-40 h-[100vh] min-h-[570px] w-[100%] translate-y-0 bg-slate-900 transition-transform delay-200 duration-700 ease-in"
            }
          >
            <div className="ServicesBar">
              <div className=" graphics h-[70%] w-[32%] rounded-xl border border-[#15B1FE] p-6 transition-transform duration-500 ease-in-out hover:-translate-y-3 hover:bg-slate-800">
                <div className="s-font-size-md s-font-size-lg tracking-tight text-white">
                  Graphic & Design
                </div>
                <div className="flex h-[60%] w-[100%] items-center justify-center overflow-hidden py-3 lg:py-10 ">
                  <Lottie
                    animationData={Graphics}
                    className="animationW w-[70%]"
                  />
                </div>
              </div>
              <div className="graphics h-[70%] w-[32%] rounded-xl border border-[#15B1FE] p-6 transition-transform duration-500 ease-in-out hover:-translate-y-3 hover:bg-slate-800">
                <div className="s-font-size-md s-font-size-lg tracking-tight text-white">
                  Programming & IT
                </div>
                <div className="flex h-[100%] w-[100%] items-center justify-center overflow-hidden py-3 lg:py-10">
                  <Lottie
                    animationData={Programming}
                    className="animationW w-[70%]"
                  />
                </div>
              </div>
              <div className="graphics h-[70%] w-[32%] rounded-xl border border-[#15B1FE] p-6 transition-transform duration-500 ease-in-out hover:-translate-y-3 hover:bg-slate-800">
                <div className="s-font-size-md s-font-size-lg tracking-tight text-white">
                  Video & Animation
                </div>
                <div className="flex h-[100%] w-[100%] items-center justify-center overflow-hidden py-3 lg:py-10">
                  <Lottie
                    animationData={Video}
                    className="animationW w-[70%]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              !services
                ? "fixed left-0 top-0 z-30 h-[100vh] min-h-[650px] w-[100%] -translate-y-full bg-blue-200 transition-transform duration-700 ease-in-out"
                : "fixed left-0 top-0 z-30 h-[100vh] min-h-[650px] w-[100%] translate-y-0 bg-blue-200 transition-transform duration-700 ease-in"
            }
          >
            <div className="absolute bottom-8 left-16 flex items-center ">
              <span className="font-sans text-3xl text-slate-900">
                Discover all services
              </span>
              <button className="ml-5 rounded-full bg-[#15B1FE] px-5 py-2 text-lg text-white">
                Order here
              </button>
            </div>
          </div>
          <div
            className={
              !itsolve
                ? "fixed left-0 top-0 z-40 flex h-[80vh] w-[100%] -translate-y-full justify-center bg-slate-900 transition-transform duration-700 ease-in-out"
                : "fixed left-0 top-0 z-40 flex h-[70vh] w-[100%] translate-y-0 justify-center bg-slate-900 transition-transform delay-200 duration-700 ease-in"
            }
          >
            <div className=" itsolveMenu ">
              <div className="w-[97%] ">
                <div className="list-container bottom-10 w-[100%] overflow-hidden ">
                  <ul className="list_solve w-[97%] ">
                    <li className="mx-10 mb-2 w-[100%]">
                      <Link
                        className="block w-[85%]  text-white hover:text-[#15B1FE] "
                        onClick={closebar}
                        href="/about"
                      >
                        About
                      </Link>
                    </li>
                    <li className="mx-10 mb-2 w-[100%]">
                      <Link
                        className="block w-[85%]  text-white hover:text-[#15B1FE]  "
                        onClick={closebar}
                        href="/"
                      >
                        Clients
                      </Link>
                    </li>
                    <li className="mx-10 mb-2 w-[100%]">
                      <Link
                        className="block w-[85%]  text-white hover:text-[#15B1FE]  "
                        onClick={closebar}
                        href="/"
                      >
                        Team
                      </Link>
                    </li>
                    <li className="mx-10 mb-2 w-[100%]">
                      <Link
                        className="block w-[85%]  text-white hover:text-[#15B1FE]  "
                        onClick={closebar}
                        href="/careers"
                      >
                        Careers
                      </Link>
                    </li>
                    <li className="mx-10 mb-2 w-[100%]">
                      <Link
                        className="block w-[85%]  text-white hover:text-[#15B1FE]  "
                        onClick={closebar}
                        href=""
                      >
                        Blog
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            className={
              !services
                ? "fixed left-0 top-0 z-40 h-[87vh] min-h-[570px] w-[100%] -translate-y-full bg-slate-900 transition-transform duration-700 ease-in-out"
                : "fixed left-0 top-0 z-40 h-[87vh] min-h-[570px] w-[100%] translate-y-0 bg-slate-900 transition-transform delay-200 duration-700 ease-in"
            }
          >
            <div className=" service mt-[140px] flex h-[100%] w-[100%] justify-around px-14">
              <div className=" graphics h-[70%] w-[32%] rounded-xl border border-[#15B1FE] p-6 transition-transform duration-500 ease-in-out hover:-translate-y-5 hover:bg-slate-800">
                <div className="s-font-size-md s-font-size-lg tracking-tight text-white">
                  Graphic & Design
                </div>
                <div className="flex h-[100%] w-[100%] items-center justify-center overflow-hidden py-3 lg:py-10 ">
                  <Lottie animationData={Graphics} className="w-[70%]" />
                </div>
              </div>
              <div className="h-[70%] w-[32%] rounded-xl border border-[#15B1FE] p-6 transition-transform duration-500 ease-in-out hover:-translate-y-5 hover:bg-slate-800">
                <div className="s-font-size-md s-font-size-lg tracking-tight text-white">
                  Programming & IT
                </div>
                <div className="flex h-[100%] w-[100%] items-center justify-center overflow-hidden py-3 lg:py-10">
                  <Lottie animationData={Programming} className="w-[70%]" />
                </div>
              </div>
              <div className="h-[70%] w-[32%] rounded-xl border border-[#15B1FE] p-6 transition-transform duration-500 ease-in-out hover:-translate-y-5 hover:bg-slate-800">
                <div className="s-font-size-md s-font-size-lg tracking-tight text-white">
                  Video & Animation
                </div>
                <div className="flex h-[100%] w-[100%] items-center justify-center overflow-hidden py-3 lg:py-10">
                  <Lottie animationData={Video} className="w-[70%]" />
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              !services
                ? "fixed left-0 top-0 z-30 h-[100vh] min-h-[650px] w-[100%] -translate-y-full bg-blue-200 transition-transform duration-700 ease-in-out"
                : "fixed left-0 top-0 z-30 h-[100vh] min-h-[650px] w-[100%] translate-y-0 bg-blue-200 transition-transform duration-700 ease-in"
            }
          >
            <div className="absolute bottom-8 left-16 flex items-center">
              <span className="font-sans text-3xl text-slate-900">
                Discover all services
              </span>
              <button className="ml-5 rounded-full bg-[#15B1FE] px-5 py-2 text-lg text-white">
                Order here
              </button>
            </div>
          </div>
          <div
            className={
              !itsolve
                ? "fixed left-0 top-0 z-40 flex h-[80vh] w-[100%] -translate-y-full justify-center bg-slate-900 transition-transform duration-700 ease-in-out"
                : "fixed left-0 top-0 z-40 flex h-[80vh] w-[100%] translate-y-0 justify-center bg-slate-900 transition-transform delay-200 duration-700 ease-in"
            }
          >
            <div className="h-[100%] w-[100%] ">
              <div className="  w-[100%]">
                <div className=" bottom-10 w-[100%]">
                  <ul className=" list_solve_desktop">
                    <li className=" mx-10 mb-3">
                      <Link
                        className="block w-[85%]  text-white hover:text-[#15B1FE]  "
                        onClick={closebar}
                        href="/about"
                      >
                        About
                      </Link>
                    </li>
                    <li className="mx-10 mb-3">
                      <Link
                        className="block w-[85%]  text-white hover:text-[#15B1FE]  "
                        onClick={closebar}
                        href="/"
                      >
                        Clients
                      </Link>
                    </li>

                    <li className="mx-10 mb-3">
                      <Link
                        className="block w-[85%]  text-white hover:text-[#15B1FE]  "
                        onClick={closebar}
                        href="/"
                      >
                        Team
                      </Link>
                    </li>
                    <li className="mx-10 mb-3">
                      <Link
                        className="block w-[85%]  text-white hover:text-[#15B1FE]  "
                        onClick={closebar}
                        href="/careers"
                      >
                        Careers
                      </Link>
                    </li>

                    <li className="mx-10 mb-3">
                      <Link
                        className="block w-[85%]  text-white hover:text-[#15B1FE]  "
                        onClick={closebar}
                        href="/"
                      >
                        Blog
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              !itsolve
                ? "fixed left-0 top-0 z-30 h-[100vh] min-h-[650px] w-[100%] -translate-y-full bg-blue-200 opacity-20 transition-transform  duration-700 ease-in-out"
                : "fixed left-0 top-0 z-30 h-[100vh] min-h-[650px] w-[100%] translate-y-0 bg-blue-200 opacity-20 transition-transform duration-700 ease-in"
            }
          >
            <div className="absolute bottom-8 left-16 flex items-center"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default DropDowns;
