
import { formatTemperature, capitalizeWords } from "../utils";

const CurrentWeather = ({cardBackground,textColor,data,currentForecast,unit}) => {

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
                {formatTemperature(currentForecast?.temperature, unit)}°
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

export default CurrentWeather;
