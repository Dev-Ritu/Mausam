const formatTemperature = (temp,unit) => {
    return unit === "Celsius"
      ? Math.round(+temp - 273.15) // Kelvin to Celsius
      : Math.round(((+temp - 273.15) * 9) / 5 + 32); // Kelvin to Fahrenheit
  };

  export default formatTemperature;