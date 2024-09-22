import React from "react";

import { formatTemperature } from "../utils";
const ForecastCard = ({key,date,morning,evening,afternoon,unit}) => {
 
  return <div
  key={key}
  className="bg-white bg-opacity-30 rounded-xl p-6 shadow-md font-bold"
>
  <h4 className="text-xl font-bold text-gray-800 flex justify-start">
    {date}
  </h4>
  <div className="flex justify-between mt-2">
    {morning?.temperature && morning?.icon && (
      <div className="text-center align-middle">
        <p className="text-2xl md:text-4xl">
          {formatTemperature(morning?.temperature,unit)}°
        </p>
        <img
          src={morning.icon}
          alt="Morning icon"
          className="w-35 h-35 ml-2"
          width={35}
          height={35}
        />
        <p className="text-lg ml-1">Morning</p>
      </div>
    )}
    {afternoon?.temperature && afternoon.icon && (
      <div className="text-center">
        <p className="text-2xl md:text-4xl">
          {formatTemperature(afternoon?.temperature, unit)}°
        </p>
        <img
          src={afternoon.icon}
          alt="Afternoon icon"
          className="w-35 h-35 ml-2"
          width={35}
          height={35}
        />
        <p className="text-lg">Afternoon</p>
      </div>
    )}
    {evening?.temperature && evening.icon && (
      <div className="text-center">
        <p className="text-2xl md:text-4xl">
          {formatTemperature(evening?.temperature,unit)}°
        </p>
        <img
          src={evening.icon}
          alt="Evening icon"
          className="w-35 h-35 ml-2"
          width={35}
          height={35}
        />
        <p className="text-lg">Evening</p>
      </div>
    )}
  </div>
</div>
};

export default ForecastCard;
