// src/components/FiveDayForecast.js
import React from "react";
import { useSelector } from "react-redux";
import clearSky from "../assets/clearSky.jpg";
import raining from "../assets/rainy.jpg";
import cloudy from "../assets/cloudy.jpg";
import Night from "../assets/night.jpg";
const FiveDayForecast = () => {
  const { data } = useSelector((state) => state.weather);
  const unit = useSelector((state) => state.temperature.unit);

  if (!data || !data.forecasts) {
    return <div>Loading...</div>;
  }

  const formatTemperature = (temp) => {
    return unit === "Celsius"
      ? Math.round(+temp - 273.15) // Kelvin to Celsius
      : Math.round(((+temp - 273.15) * 9) / 5 + 32); // Kelvin to Fahrenheit
  };

  // Function to create a forecast map
  const createForecastMap = (forecasts) => {
    return forecasts.reduce((acc, forecast) => {
      const date = forecast.dateTime.split(" ")[0]; // Extract date
      const timeOfDay = getTimeOfDay(forecast.dateTime.split(" ")[1]); // Get time of day

      if (!acc[date]) {
        acc[date] = { date, morning: {}, afternoon: {}, evening: {} };
      }

      acc[date][timeOfDay] = {
        temperature: forecast.temperature,
        icon: forecast.icon,
      };

      return acc;
    }, {});
  };
  const getBackgroundImage = () => {
    const { condition, icon } = data.forecasts[0];
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
  // Helper function to determine the time of day
  const getTimeOfDay = (time) => {
    const hour = parseInt(time.split(":")[0]);
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  const fiveDayForecasts = Object.values(
    createForecastMap(data.forecasts)
  ).slice(0, 5);

  return (
    <div   className="md:w-[80%] lg:w-[60%] w-[100%]">
      <div className="text-white font-bold text-xl mt-2 p-2 "> Five days forecast</div>
      <div
        className="grid grid-cols-1 w-full gap-4 mt-4 p-4 rounded-xl shadow-lg"
        style={{
          backgroundImage: `url(${getBackgroundImage()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {fiveDayForecasts.map(
          ({ date, morning, afternoon, evening }, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-600 via-gray-200 to-gray-500 rounded-xl p-6 shadow-md">
              <h4 className="text-xl font-bold text-gray-800 flex justify-start">
                {date}
              </h4>
              <div className="flex justify-between mt-2">
                {morning.temperature && morning.icon && (
                  <div className="text-center">
                    <p className="text-2xl md:text-4xl">
                      {formatTemperature(morning.temperature)}°
                    </p>
                    <img
                      src={morning.icon}
                      alt="Morning icon"
                      className="w-35 h-35"
                      width={35}
                      height={35}
                    />
                    <p className="text-lg">Morning</p>
                  </div>
                )}
                {afternoon.temperature && afternoon.icon && (
                  <div className="text-center">
                    <p className="text-2xl md:text-4xl">
                      {formatTemperature(afternoon.temperature)}°
                    </p>
                    <img
                      src={afternoon.icon}
                      alt="Afternoon icon"
                      className="w-35 h-35"
                      width={35}
                      height={35}
                    />
                    <p className="text-lg ">Afternoon</p>
                  </div>
                )}
                {evening.temperature && evening.icon && (
                  <div className="text-center">
                    <p className="text-2xl md:text-4xl">
                      {formatTemperature(evening.temperature)}°
                    </p>
                    <img
                      src={evening.icon}
                      alt="Evening icon"
                      className="w-35 h-35"
                      width={35}
                      height={35}
                    />
                    <p className="text-lg">Evening</p>
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FiveDayForecast;
