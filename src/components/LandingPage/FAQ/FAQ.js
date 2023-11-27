import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "../style/transitions.css";

const FAQ = () => {
  const [toggle1, setToggle1] = useState();
  const [toggle2, setToggle2] = useState();
  const [toggle3, setToggle3] = useState();
  const [toggle4, setToggle4] = useState();

  const questions = [
    {
      quest:
        "How can I ensure the security of my order and payment on your website?",
      ans: "At itsolve, we prioritize the security of our clients' orders and payments. We have implemented robust security measures to protect your information. Our website uses industry-standard encryption protocols to ensure secure communication and transactions. Additionally, we employ a ticketing system where clients can submit their requests and engage in direct chat communication with the assigned team member, ensuring a secure and transparent process.",
    },
    {
      quest:
        "What happens if I am not satisfied with the final project delivered?",
      ans: "We strive for customer satisfaction, and if you are not fully satisfied with the final project, we have a refund policy in place. Before releasing the payment to the team member, we ensure that you are completely satisfied with the delivered work. If for any reason you are not satisfied, you are eligible for a 100% refund. Your happiness and the quality of our services are our top priorities.",
    },
    {
      quest: "How do I request a quote for a specific project?",
      ans: "Requesting a quote for your project is simple and straightforward on our website. You can visit our ticket system and provide detailed information about your project requirements. Our team will carefully review your request and provide you with a competitive quote tailored to your needs. We aim to provide transparent and reasonable pricing for all our services.",
    },
    {
      quest: "Can I set a budget for my project?",
      ans: "Yes, you can absolutely set a budget for your project. We understand that clients have different financial considerations, and we aim to accommodate their needs. While requesting a quote, you can specify your budget, and our team will strive to work within that budget while delivering high-quality results. Our flexible pricing options and open communication ensure that you receive the best value for your investment.",
    },
  ];

  const show1 = () => {
    setToggle1(!toggle1);
  };

  const show2 = () => {
    setToggle2(!toggle2);
  };

  const show3 = () => {
    setToggle3(!toggle3);
  };

  const show4 = () => {
    setToggle4(!toggle4);
  };

  return (
    <div className="flex flex-col lg:flex-row pb-28 px-5 md:px-14 gap-10 md:gap-20">
      <div className="w-[90%] md:w-[60%]">
        <h2 className="text-white text-3xl md:text-5xl">FAQ</h2>
        <p className="text-md lg:text-lg font-normal text-[#15B1FE]  leading-tight mt-10 md:mt-16 max-w-[300px] md:max-w-[250px] ">
          Here are some of our most asked questions. If yours is not there,
          contact us.
        </p>
      </div>
      <div className="flex flex-col gap-5 w-[100%]">
        <div
          className="rotate flex gap-8 border border-[#15B1FE] rounded-xl w-[100%] p-5"
          onClick={show1}
        >
          <div className="pt-2 pl-2">
            <span className="text-white">
              <FaPlus className="plus" />
            </span>
          </div>
          <div>
            <h2 className="text-white text-md leading-4 md:text-xl font-medium">
              {questions[0]["quest"]}
            </h2>
            {toggle1 && (
              <p className="text-white text-md md:text-lg leading-4 mt-6 mb-10">
                {questions[0]["ans"]}
              </p>
            )}
          </div>
        </div>
        <div
          className="rotate flex gap-8 border border-[#15B1FE] rounded-xl w-[100%] p-5"
          onClick={show2}
        >
          <div className="pt-2 pl-2">
            <span className="text-white">
              <FaPlus className="plus" />
            </span>
          </div>
          <div>
            <h2 className="text-white text-md leading-4 md:text-xl font-medium">
              {questions[1]["quest"]}
            </h2>
            {toggle2 && (
              <p className="text-white text-md md:text-lg leading-4 mt-6 mb-10">
                {questions[1]["ans"]}
              </p>
            )}
          </div>
        </div>
        <div
          className="rotate flex gap-8 border border-[#15B1FE] rounded-xl w-[100%] p-5"
          onClick={show3}
        >
          <div className="pt-2 pl-2">
            <span className="text-white">
              <FaPlus className="plus" />
            </span>
          </div>
          <div>
            <h2 className="text-white text-md leading-4 md:text-xl font-medium">
              {questions[2]["quest"]}
            </h2>
            {toggle3 && (
              <p className="text-white text-md md:text-lg leading-4 mt-6 mb-10">
                {questions[2]["ans"]}
              </p>
            )}
          </div>
        </div>
        <div
          className="rotate flex gap-8 border border-[#15B1FE] rounded-xl w-[100%] p-5"
          onClick={show4}
        >
          <div className="pt-2 pl-2">
            <span className="text-white">
              <FaPlus className="plus" />
            </span>
          </div>
          <div>
            <h2 className="text-white text-md leading-4 md:text-xl font-medium">
              {questions[3]["quest"]}
            </h2>
            {toggle4 && (
              <p className="text-white text-md md:text-lg leading-4 mt-6 mb-10">
                {questions[3]["ans"]}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
