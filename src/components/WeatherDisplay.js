import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import clearSky from "../assets/clearSky.jpg";
import raining from "../assets/rainy.jpg";
import cloudy from "../assets/cloudy.jpg";
import capitalizeWords from "../utils/capitalizeWords";
import Night from "../assets/night.jpg";

const WeatherDisplay = () => {
  const { data, error } = useSelector((state) => state.weather);
  const unit = useSelector((state) => state.temperature.unit);

  const formatTemperature = (temp) => {
    return temp && unit === "Celsius"
      ? Math.round(+temp - 273.15) // Kelvin to Celsius
      : Math.round(((+temp - 273.15) * 9) / 5 + 32); // Kelvin to Fahrenheit
  };

  const getBackgroundImage = (currentForecast) => {
    const { condition, icon } = currentForecast;
    if (icon === "/static/media/moon.9be36167645dff9d9695.png") {
        return Night
    } else if (condition.toLowerCase().includes("clear")) {
      return clearSky;
    } else if (condition.toLowerCase().includes("rain")) {
      return raining;
    } else if (condition.toLowerCase().includes("cloud")) {
      return cloudy;
    }
    return clearSky; // default background
  };

  const getTextColor = (condition) => {
    if (condition.toLowerCase().includes("clear")) {
      return "text-gray-500"; // Darker text for clear sky
    }
    return "text-white"; // White text for cloudy or rainy
  };

  useEffect(() => {
    // Set gradient background on the body
    document.body.style.background =
      "linear-gradient(to bottom, #333, #999, #333)";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    return () => {
      document.body.style.background = ""; // Reset background on component unmount
    };
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!data) {
    return (
      <div>
        <div role="status">{/* Spinner for loading */}</div>
      </div>
    );
  }

  const currentForecast = data.forecasts[0];
  const cardBackground = getBackgroundImage(currentForecast);
  const textColor = getTextColor(currentForecast.condition); // Determine text color
  console.log("currentForecast", currentForecast);
  return (
    <div className="flex flex-col justify-center md:w-[80%] lg:w-[60%] w-[100%] ">
      <div
        className="rounded-xl shadow-xl flex flex-col items-center mb-4 md:mb-0 overflow-hidden mt-5"
        style={{
          backgroundImage: `url(${cardBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={`w-full flex justify-start px-4 py-2 ${textColor}`}>
          <h2 className="text-xl md:text-2xl font-bold mb-2 ">
            {`${data.city}, ${data.country}`}
          </h2>
        </div>
        <div className=" w-full p-6 rounded-b-lg flex items-center justify-between">
          <div className="flex flex-col w-[70%]">
            <div className="flex justify-between items-center">
              <p
                className={`text-3xl md:text-6xl font-bold md:ml-4 ${textColor}`}
              >
                {formatTemperature(currentForecast?.temperature)}°
              </p>
              <p className={`text-lg md:text-2xl md:ml-4 font-bold ${textColor}`}>
                Humidity: {currentForecast.humidity}%
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p
                className={`text-xl md:text-2xl font-semibold md:ml-4 ${textColor}`}
              >
                {capitalizeWords(currentForecast.condition)}
              </p>
              <p className={`text-lg md:text-2xl md:ml-4 font-bold ${textColor}`}>
                Wind Speed: {currentForecast.windSpeed} m/s
              </p>
            </div>
          </div>
          <div className="w-[30%] flex justify-end">
            <img
              src={currentForecast.icon}
              alt="Weather icon"
              className="w-16 h-16 md:w-30 md:h-30 overflow-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
