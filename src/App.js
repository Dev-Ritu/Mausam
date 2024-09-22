import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "./components/Navbar";

import WeatherDetail from "./WeatherDetail";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
     <WeatherDetail/>
    </div>
  );
}

export default App;
