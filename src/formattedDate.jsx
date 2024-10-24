

function FormattedDate(prop) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[prop.date.getDay()];

  let hours = prop.date.getHours();
  let minutes = prop.date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12 || 12; // Converts '0' to '12' for midnight

  // Add leading zero to minutes if necessary
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return (
    <div>
      {day} {hours}:{minutes} {ampm}
    </div>
  );
}

export default FormattedDate;
