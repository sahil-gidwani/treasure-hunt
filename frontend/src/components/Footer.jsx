import React from "react";
import ship from "../images/footership.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 rounded-lg shadow m-4">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <a href="https://www.ascii-code.com/" target="_blank">
          <img src={ship} alt="ship" className="w-14 h-auto" />
        </a>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white sm:mt-0">
          <li>
            Website designed by :{" "}
            <a
              href="https://www.linkedin.com/in/sahil-gidwani"
              className="mr-4 hover:underline md:mr-6 "
            >
              Sahil Gidwani
            </a>{" "}
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
