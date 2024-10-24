
import "./WeatherTemp.css";

function WeatherTemp(prop) {
  return (
    <div className="WeatherTemp">
      <span className="temperature">
        {Math.round(prop.celsius)}
        <span className="unit">
          °C
        </span>
      </span>
    </div>
  );
}

export default WeatherTemp;
