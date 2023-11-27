import React from "react";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import "../style/components/footer/footerlist.css";
import Link from "next/link"
const FooterList = () => {
    return (
        <div className="mx-20 py-8">
            <div className="hidden lg:block">
                <div className="grid  grid-cols-2 lg:grid-cols-6 gap-4 font-semibold text-white">
                    <nav>
                        <ul>
                            <li className="my-2">
                                <a
                                    target="_blank"
                                    className="flex items-center "
                                    href="https://www.instagram.com/itsolve.be/"
                                    rel="noreferrer"
                                >
                                    <BsInstagram className="inline-block mx-2 hover:scale-125 hover:duration-300"></BsInstagram>{" "}
                                    Instagram
                                </a>
                            </li>
                            <li className="my-2">
                                <a
                                    target="_blank"
                                    className="flex items-center "
                                    href="https://www.facebook.com/ITSolve.Belgium"
                                    rel="noreferrer"
                                >
                                    <BsFacebook className="inline-block mx-2 hover:scale-125 hover:duration-300"></BsFacebook>{" "}
                                    Facebook
                                </a>
                            </li>
                            <li className=" my-2">
                                <a className="flex items-center " href="mailto:info@itsolve.be">
                                    {" "}
                                    <AiOutlineMail className="inline-block mx-2 hover:scale-125 hover:duration-300"></AiOutlineMail>{" "}
                                    info@itsolve.be
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <nav>
                        <ul>
                            <li>
                                <Link href="/about">About</Link>
                            </li>
                            <li>
                                <Link href="/careers">Careers</Link>
                            </li>
                            <li>
                                <Link href="/">Services</Link>
                            </li>
                            <li>
                                <Link href="/">Contact</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="self-end">
                        <h2>© itsolve 2023</h2>
                    </div>
                    <div className="self-end">
                        <h2 className=""> Privacy Policy </h2>
                        <h2 className="">Terms of Service </h2>
                    </div>
                </div>
            </div>
            <div className="lg:hidden text-white font-semibold">
                <div className=" flex justify-items-start gap-16 pb-2">
                    <nav>
                        <ul>
                            <li className="my-2">
                                <a
                                    target="_blank"
                                    className="flex items-center "
                                    href="https://www.instagram.com/itsolve.be/"
                                    rel="noreferrer"
                                >
                                    <BsInstagram className="inline-block mx-2 hover:scale-125 hover:duration-300"></BsInstagram>{" "}
                                    Instagram
                                </a>
                            </li>
                            <li className="my-2">
                                <a
                                    target="_blank"
                                    className="flex items-center "
                                    href="https://www.facebook.com/ITSolve.Belgium"
                                    rel="noreferrer"
                                >
                                    <BsFacebook className="inline-block mx-2 hover:scale-125 hover:duration-300"></BsFacebook>{" "}
                                    Facebook
                                </a>
                            </li>
                            <li className=" my-2">
                                <a className="flex items-center " href="mailto:info@itsolve.be">
                                    {" "}
                                    <AiOutlineMail className="inline-block mx-2 hover:scale-125 hover:duration-300"></AiOutlineMail>{" "}
                                    info@itsolve.be
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <nav>
                        <ul>
                            <li>
                                <Link href="/">About</Link>
                            </li>
                            <li>
                                <Link href="/careers">Careers</Link>
                            </li>
                            <li>
                                <Link href="/">Services</Link>
                            </li>
                            <li>
                                <Link href="/">Contact</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <hr />
                <div className=" flex justify-between items-center pt-4 ">
                    <div className="">
                        <h2>© itsolve 2023</h2>
                    </div>
                    <div className="">
                        <h2 className=""> Privacy Policy</h2>
                        <h2 className=""> Terms of Service</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterList;
