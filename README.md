# Weaather Forcast Application

The Weather Forcast Application is a React-based application that allows users to view real-time weather information for various cities, along with a 5-day forecast. The app also features temperature unit conversion and responsive design.

## Project Setup

### Prerequisites
- **Node.js** (version 14.x or higher)
- **npm** (version 6.x or higher)
- OpenWeatherMap API key (sign up at https://openweathermap.org/ to get one)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Dev-Ritu/Mausam.git
Navigate into the project directory:

bash
Copy code
cd Mausam
Install the necessary dependencies:

bash
Copy code
npm install
Create a .env file in the root directory and add your OpenWeatherMap API key:

makefile
Copy code
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
Start the development server:

bash
Copy code
npm start
Open the app in your browser:

The app should be running at http://localhost:3000.

Assumptions Made During Development
The weather data is fetched using the OpenWeatherMap API.
The default city displayed is New York when no search has been performed.
The application assumes the user has a stable internet connection to load API data.

How to Use the Application
Search for City Weather: Enter the name of a city in the search bar. As you type, suggestions will appear in a dropdown menu. Select a city to view its current weather.

View Weather Details: The main weather card displays:

Current temperature
Humidity
Wind speed
Cloudiness

5-Day Forecast: Scroll down to view the weather forecast for the next 5 days, including the expected temperature and weather conditions.

Temperature Unit Conversion: You can toggle between Celsius and Fahrenheit by clicking on the displayed temperature.

Responsive Design: The app is responsive and works on mobile, tablet, and desktop devices.

Make sure to replace the placeholder `your_openweathermap_api_key` in the `.env` section with your actual API key. If your GitHub repository link is different, you can replace `yourusername/weather-app.git` with the correct link.
