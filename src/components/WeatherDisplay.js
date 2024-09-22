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
      return Night;
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
      <div className="h-screen w-full">
        <div role="status" className="flex mt-10 justify-center">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
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
              <p
                className={`text-lg md:text-2xl md:ml-4 font-bold ${textColor}`}
              >
                Humidity: {currentForecast.humidity}%
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p
                className={`text-xl md:text-2xl font-semibold md:ml-4 ${textColor}`}
              >
                {capitalizeWords(currentForecast.condition)}
              </p>
              <p
                className={`text-lg md:text-2xl md:ml-4 font-bold ${textColor}`}
              >
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
