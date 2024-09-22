// Import the sun.gif if you're using a bundler like Webpack or Next.js
import sunGif from "../assets/sun.png";
import moon from "../assets/moon.png";

export const formatWeatherData = (data) => {
  const formattedData = {
    country: data.city.country,
    city: data.city.name,
    forecasts: data.list.map((entry) => {
      console.log("Temperature in Kelvin:", entry.main.temp);

      // Check if the icon is '01d' and replace it with the local sun.gif
      let icon = "";
      if (entry.weather[0].icon === "01d") icon = sunGif;
      else if (entry.weather[0].icon === "01n") icon = moon;
      else
        icon = `http://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`; // Default OpenWeatherMap Icon

      return {
        dateTime: entry.dt_txt,
        temperature: entry.main.temp,
        condition: entry.weather[0].description,
        icon: icon,
        maxTemp: Math.round(entry.main.temp_max - 273.15),
        minTemp: Math.round(entry.main.temp_min - 273.15),
        humidity: entry.main.humidity,
        windSpeed: entry.wind.speed,
      };
    }),
  };

  return formattedData;
};
