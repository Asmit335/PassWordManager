import React from "react";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center p-3 bg-green-700">
        <div className="ml-10">
          <h1 className="cursor-pointer font-bold text-xl text-white">
            <span className="text-gray-300 ">&lt;</span>
            PassWord Manager
            <span className="text-gray-300">/&gt;</span>
          </h1>
        </div>

        <div className="text-3xl cursor-pointer mr-10 hover:text-white">
          <a href="https://www.github.com" target="_blank">
            <FaGithub />
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
