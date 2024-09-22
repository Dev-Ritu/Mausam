// src/components/Navbar.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleUnit } from "../redux/temperatureSlice";
import SearchDropdown from "./SearchDropdown";

const Navbar = () => {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.temperature.unit);

  const handleToggle = () => {
    dispatch(toggleUnit());
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-400 to-gray-900 flex flex-col text-white md:flex-row justify-between p-4 shadow-md sticky top-0">
      <div className="text-lg md:text-xl font-bold text-white bg-transparent p-2 rounded font-sans">
        <span role="img" aria-label="globe">
          🌍
        </span>
        <span>Mausam</span>
      </div>
      <div className="flex">
        <div className="flex items-center md:w-96 w-[80%]">
          <SearchDropdown />
        </div>
        <button
          className={`ml-2  md:ml-4 py-2 rounded focus:outline-none w-20 md:w-44 overflow-hidden flex cursor-pointer`}
          onClick={handleToggle}
        >
          <div
            className={` hover:bg-gray-200 p-1 md:p-2 text-lg rounded-l-full w-[50%] ${
              unit === "Celsius"
                ? "bg-gray-500 text-white"
                : "bg-white text-gray-500"
            }`}
          >
            °C
          </div>
          <div
            className={` hover:bg-gray-200 p-1 md:p-2 text-lg rounded-r-full w-[50%] ${
              unit !== "Celsius"
                ? "bg-gray-500 text-white"
                : "bg-white text-gray-500"
            }`}
          >
            °F
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
