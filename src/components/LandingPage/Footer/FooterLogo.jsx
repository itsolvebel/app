import React from "react";
import Image from "next/image"
import Link from "next/link";
const FooterLogo = () => {
    return (
        <div className="mx-20 py-6 lg:h-[350px] h-[300px]">
        <Link href={"/"}>
            <Image
                className="cursor-pointer h-auto w-[50%] lg:w-[20%]"
                src={"/assets/LogoWhite.png" }
                alt=""
                width={300}
                height={200}
            />
        </Link>
        </div>
    );
};

export default FooterLogo;
