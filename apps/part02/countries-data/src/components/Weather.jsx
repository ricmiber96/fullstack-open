import React from 'react';

export default function Weather({data}) {
  return (
    <div>
      <h2>Weather in {data.name}</h2>
        <p>Temperature: {data.main.temp}</p>
        <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt={data.weather[0].description} />
        <p>Wind: {data.wind.speed} mph</p>
    </div>
  );
}
