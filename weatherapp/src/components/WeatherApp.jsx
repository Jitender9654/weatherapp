import React, { useEffect, useState } from "react";
import "./css/style.css";

  const WeatherApp = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Faridabad");

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=187cc42e2104ad6286a0d81f8b6d4202`;
      const response = await fetch(url);
      const resjson = await response.json();
      console.log(resjson);
      setCity(resjson.main);
    };
    fetchApi();
  }, [search]);

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = addLeadingZero(date.getHours());
      const minutes = addLeadingZero(date.getMinutes());
      const seconds = addLeadingZero(date.getSeconds());
      const timeFormat = hours >= 12 ? "PM" : "AM";
      const twelveHourFormat = hours % 12 || 12;
      setCurrentTime(`${twelveHourFormat}:${minutes}:${seconds} ${timeFormat}`);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const addLeadingZero = (value) => {
    return value < 10 ? `0${value}` : value;
  };
  // const currentDay = new Date().toLocaleDateString("en-US", {
  //   weekday: "long",
  // });
  const currentDate = new Date().toDateString();

  // const [date,setdate] = useState(new Date());
  return (
    <>
      <div className="box">
        <div className="inputData">
          <input
            type="search"
            placeholder="Enter City Name"
            className="inputFeild"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        {!city ? (
          <p className="errorMsg">No Data Found</p>
        ) : (
          <div>
            <div className="info">
              <h2 className="location">
                <i
                  className="fas fa-street-view"
                  style={{ color: "#eccc68" }}
                ></i>
                {search}
              </h2>
              <div className="time">
                {/* <p id="date">{currentDay}</p> */}
                <p id="date">{currentDate}</p>
                <p id="date">{currentTime}</p>
              </div>
              <p className="temp">{city.temp}°C</p>
            </div>
            <h3 className="tempmin_max">
              Min: {city.temp_min}°C | Max: {city.temp_max}°C
            </h3>
            <div className="wave -one"></div>
            <div className="wave -tow"></div>
            <div className="wave -three"></div>
          </div>
        )}
      </div>
    </>
  );
};
export default WeatherApp;
