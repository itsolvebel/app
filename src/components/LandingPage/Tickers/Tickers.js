// noinspection JSValidateTypes

import Marquee from "react-fast-marquee";
import React from "react";
import Image from "next/image"
const Tickers = () => {
  const row1 = [
    <Image key={"partner1"}
           src="/assets/LogoWhite.png"
           alt=" "
           className="ml-10 h-[25px] w-auto md:ml-20 md:h-[50px]"
           width={140}
           height={50}
    />,
    <Image key={"partner2"}
           src="/assets/LogoWhite.png"
           alt=" "
           className="ml-10 h-[25px] w-auto md:ml-20 md:h-[50px]"
           width={140}
           height={50}
    />,
    <Image key={"partner3"}
           src="/assets/LogoWhite.png"
           alt=" "
           className="ml-10 h-[25px] w-auto md:ml-20 md:h-[50px]"
           width={140}
           height={50}
    />,
    <Image key={"partner4"}
           src="/assets/LogoWhite.png"
           alt=" "
           className="ml-10 h-[25px] w-auto md:ml-20 md:h-[50px]"
           width={140}
           height={50}
    />,
    <Image key={"partner5"}
           src="/assets/LogoWhite.png"
           alt=" "
           className="ml-10 h-[25px] w-auto md:ml-20 md:h-[50px]"
           width={140}
           height={50}
    />,
    <Image key={"partner6"}
           src="/assets/LogoWhite.png"
           alt=" "
           className="ml-10 h-[25px] w-auto md:ml-20 md:h-[50px]"
           width={140}
           height={50}
    />,
    <Image key={"partner7"}
           src="/assets/LogoWhite.png"
           alt=" "
           className="ml-10 h-[25px] w-auto md:ml-20 md:h-[50px]"
           width={140}
           height={50}
    />,
    <Image key={"partner8"}
           src="/assets/LogoWhite.png"
           alt=" "
           className="ml-10 h-[25px] w-auto md:ml-20 md:h-[50px]"
           width={140}
           height={50}
    />,
    <Image key={"partner9"}
           src="/assets/LogoWhite.png"
           alt=" "
           className="ml-10 h-[25px] w-auto md:ml-20 md:h-[50px]"
           width={140}
           height={50}
    />,
    <Image key={"partner10"}
           src="/assets/LogoWhite.png"
           alt=" "
           className="ml-10 h-[25px] w-auto md:ml-20 md:h-[50px]"
           width={140}
           height={50}
    />,
    <Image key={"partner11"}
           src="/assets/LogoWhite.png"
           alt=" "
           className="ml-10 h-[25px] w-auto md:ml-20 md:h-[50px]"
           width={140}
           height={50}
    />,
    <Image key={"partner12"}
           src="/assets/LogoWhite.png"
           alt=" "
           className="ml-10 h-[25px] w-auto md:ml-20 md:h-[50px]"
           width={140}
           height={50}
    />,
    <Image key={"partner13"}
           src="/assets/LogoWhite.png"
           alt=" "
           className="ml-10 h-[25px] w-auto md:ml-20 md:h-[50px]"
           width={140}
           height={50}
    />
  ];
  const row2 = row1;
  return (
      <div className="flex flex-col gap-8 pb-10 md:py-20 md:pb-28">
        <h2 className="mb-5 ml-10 text-2xl tracking-wide text-[#15B1FE]">
          Trusted partner of
        </h2>
        <div>
          <Marquee
              direction="right"
              speed={100}
              gradient={true}
              gradientColor={[15, 23, 42]}
              gradientWidth={150}
          >
            {row1.map(image => {
              return <div key={image.key}>{image}</div>
            })}
          </Marquee>
        </div>
        <div>
          <Marquee
              direction="left"
              speed={90}
              gradient={true}
              gradientColor={[15, 23, 42]}
              gradientWidth={150}
          >
            {row2.map(image => {
              return <div key={image.key}>{image}</div>
            })}
          </Marquee>
        </div>
      </div>
  );
}

export default Tickers;
