// import WeatherSearch from "./WeatherSearch";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./Weather";

import "./App.css";

function App() {
  return (
    <div className="App">
    <div className="container AppContainer">
      <Weather defaultCity="Dhaka" />
        
      </div>
    </div>
  );
}

export default App;
