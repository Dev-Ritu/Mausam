import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWeatherData, setWeatherError } from "../redux/weatherSlice";
import { formatWeatherData } from "../utils/getFormattedData";

const SearchDropdown = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();

  const fetchWeatherData = async (lat, lon) => {
    try {
      setLoading(true); // Set loading to true
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=672f17559ff881ac8cee6c874242de28`
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const weatherData = await response.json();
      const formattedData = formatWeatherData(weatherData);

      dispatch(setWeatherData(formattedData));
    } catch (error) {
      dispatch(setWeatherError("Error fetching weather data"));
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const debounceTimeout = useRef(null);

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setError("");

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (query.length > 0) {
        fetchCities(query);
      } else {
        setSearchResults([]);
        setDropdownOpen(false);
      }
    }, 1000);
  };

  const fetchCities = async (query) => {
    try {
      setLoading(true); // Set loading to true
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=672f17559ff881ac8cee6c874242de28`
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      if (data.length === 0) {
        setError("City not found");
        setDropdownOpen(false);
        return;
      }

      setSearchResults(data);
      setDropdownOpen(true);
    } catch (error) {
      setError("Error fetching data. Please try again.");
      setDropdownOpen(false);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleSelect = async (city) => {
    setSearchQuery(city.name);
    setDropdownOpen(false);
    await fetchWeatherData(city.lat, city.lon);
  };

  useEffect(() => {
    fetchWeatherData(40.7127, -74.006);
  }, [fetchWeatherData]);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search City"
        value={searchQuery}
        onChange={handleChange}
        className="px-4 py-2 rounded-l-full text-black focus:outline-none w-[80%]"
        onClick={() => searchQuery && setDropdownOpen(true)}
      />
      <button
        className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-r-full w-[20%]"
        onClick={() => fetchCities(searchQuery)}
      >
        <i className="fas fa-search"></i>
      </button>
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 bg-white text-black rounded-lg shadow-lg mt-1 w-full min-h-40 border border-gray-300"
        >
          {loading ? (
            <div role="status" className="flex justify-center m-auto p-4">
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
              <span className="sr-only">Loading...</span>
            </div>
          ) : !searchResults.length ? (
            <div className="p-4 text-center text-gray-500">
              No results found
            </div>
          ) : (
            <div>
              {" "}
              {error ? (
                <div className="text-red-500">{error}</div>
              ) : (
                searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center hover:bg-gray-200 m-1 py-1 px-2 hover:text-white transition-colors duration-200 cursor-pointer rounded-lg"
                    onClick={() => handleSelect(result)}
                  >
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    <div className="flex items-center hover:text-white text-xs sm:text-lg">
                      <div className="font-semibold">
                        {result.name}, {result.state}, {result.country}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
