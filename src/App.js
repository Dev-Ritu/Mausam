import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "./components/Navbar";
import WeatherDisplay from "./components/WeatherDisplay";
import ForcastCard from "./components/ForcastCard";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex-grow p-4 overflow-y-auto w-full">
        <div className="flex justify-center">
          <WeatherDisplay />
        </div>
        <div className="flex justify-center">
          {" "}
          <ForcastCard />
        </div>
      </div>
    </div>
  );
}

export default App;
