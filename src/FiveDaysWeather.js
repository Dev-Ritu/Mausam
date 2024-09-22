import React from "react";
import { useSelector } from "react-redux";
import clearSky from "./assets/clearSky.jpg";
import raining from "./assets/rainy.jpg";
import cloudy from "./assets/cloudy.jpg";
import night from "./assets/night.jpg";
import ForecastCard from "./components/ForcastCard";

const FiveDaysWeather = () => {
  const { data } = useSelector((state) => state.weather);
  const unit = useSelector((state) => state.temperature.unit);

  if (!data || !data.forecasts) {
    return <div>Loading...</div>;
  }

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
      return night;
    } else if (condition.toLowerCase().includes("clear")) {
      return clearSky;
    } else if (condition.toLowerCase().includes("rain")) {
      return raining;
    } else if (condition.toLowerCase().includes("cloud")) {
      return cloudy;
    }
    return clearSky;
  };

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
    <div className="md:w-[80%] lg:w-[60%] w-[100%]">
      <div className="text-white font-bold text-xl mt-2 p-2 ">
        Five days forecast
      </div>
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
            <ForecastCard
              date={date}
              afternoon={afternoon}
              evening={evening}
              index={index}
              morning={morning}
              unit={unit}
            />
          )
        )}
      </div>
    </div>
  );
};

export default FiveDaysWeather;
