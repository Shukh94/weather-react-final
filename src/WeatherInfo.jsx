
import FormattedDate from "./formattedDate";
import AnimateIcon from "./AnimateIcon";
import WeatherTemp from "./WeatherTemp";

function WeatherInfo(prop) {
  return (
    <div className="WeatherInfo">
      <h1>{prop.data.city}</h1>
      <ul className="info-left">
        <li>
          <FormattedDate date={prop.data.date} />
        </li>
        <li className="text-capitalize">{prop.data.description}</li>
      </ul>
      <div className="row">
        <div className="col-6 weather-info">
          <AnimateIcon code={prop.data.icon} />
          <WeatherTemp celsius={prop.data.temperature} />
        </div>
        <div className="col-6">
          <ul className="info-right">
            <li>Humidity: {prop.data.humidity}%</li>
            <li>Wind: {prop.data.wind} km/h</li>
          </ul>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-6 other-info">
          <ul className="other-info">
            <li>Feels Like: {props.data.feels}°C</li>
            <li>max: {props.data.maxTemp}°C</li>
            <li>Min: {props.data.minTemp}°C</li>
          </ul>
        </div>
      </div> */}
    </div>
  );
}

export default WeatherInfo;
