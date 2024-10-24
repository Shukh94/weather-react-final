

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


  hours = hours % 12 || 12; 

  // Add leading zero to minutes if necessary
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return (
    <div>
      {day} {hours}:{minutes} {ampm}
    </div>
  );
}

export default FormattedDate;
