import { useSelector } from "react-redux";
import clearSky from "./assets/clearSky.jpg";
import raining from "./assets/rainy.jpg";
import cloudy from "./assets/cloudy.jpg";
import Night from "./assets/night.jpg";
import CurrentWeather from "./components/CurrentWeather";
import FiveDaysWeather from "./FiveDaysWeather";
import { useEffect } from "react";

const WeatherDetail = () => {
  const { data, error } = useSelector((state) => state.weather);
  const unit = useSelector((state) => state.temperature.unit);

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
      return "text-gray-500";
    }
    return "text-white";
  };

  useEffect(() => {
    document.body.style.background =
      "linear-gradient(to bottom, #333, #999, #333)";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    return () => {
      document.body.style.background = ""; 
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
  const textColor = getTextColor(currentForecast.condition);

  return (
    <div className="flex-grow p-4 overflow-y-auto w-full">
      <div className="flex justify-center">
        <CurrentWeather
          cardBackground={cardBackground}
          textColor={textColor}
          unit={unit}
          data={data}
          currentForecast={currentForecast}
          _
        />
      </div>
      <div className="flex justify-center">
        <FiveDaysWeather />
      </div>
    </div>
  );
};

export default WeatherDetail;
