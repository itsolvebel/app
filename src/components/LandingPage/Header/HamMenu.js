import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";

const HamMenu = ({ icon, set_icon, toggle1, toggle2, isclosed }) => {
  const [services, setServices] = useState(false);
  const [itsolve, setITsolve] = useState(false);
  useEffect(() => {
    if (isclosed) {
      setServices(false);
      setITsolve(false);
    }
  });

  const toggleServices = () => {
    console.log("Toggle Services, current value is: ", services);
    if (!services) {
      set_icon(true);
      toggle1(true);
      toggle2(false);
    } else {
      toggle1(false);
    }
    setServices(!services);
    setITsolve(false);
  };

  const toggleITSolve = () => {
    if (!itsolve) {
      set_icon(true);
      toggle2(true);
      toggle1(false);
    } else {
      toggle2(false);
    }
    setITsolve(!itsolve);
    setServices(false);
  };

  return (
    <>
      <div
        className={
          icon
            ? "conatiner-fluid absolute left-0 top-0 z-30 h-[100vh] w-[100%] -translate-y-full bg-slate-950 transition-transform duration-1000 ease-in-out"
            : "conatiner-fluid absolute left-0 top-0 z-30 h-[100vh] w-[100%] translate-y-0 bg-slate-950 transition-transform duration-1000 ease-in-out"
        }
      >
        <ul className="mt-[100px] w-[100%] text-white">
          <div onClick={toggleServices}>
            <li className="flex w-[100%] items-center justify-between p-5">
              <span className="text-2xl">Servcies</span>
              <FaAngleDown
                className={
                  !services
                    ? "rotate-0 transition-transform duration-700 ease-in-out"
                    : "rotate-180 transition-transform duration-700 ease-in-out"
                }
              />
            </li>
          </div>

          <li
            className="flex w-[100%] items-center justify-between p-5"
            onClick={toggleITSolve}
          >
            <span className="text-2xl">itsolve</span>
            <FaAngleDown
              className={
                !itsolve
                  ? "rotate-0 transition-transform duration-700 ease-in-out"
                  : "rotate-180 transition-transform duration-700 ease-in-out"
              }
            />
          </li>
          <li className="p-5">
            <span className="text-2xl">contact</span>
          </li>
          <li className="flex w-[100%] items-center justify-between p-5">
            <span className="text-2xl">en</span>
            <FaAngleDown />
          </li>
        </ul>
      </div>
    </>
  );
};

export default HamMenu;
