import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

export default function CountryItem({country}) {
    const [weather, setWeather] = useState([])

    useEffect(() => {
        const api_key = import.meta.env.VITE_API_KEY
        axios
        .get(`https://api.openweathermap.org/data/3.0/weather?q=${country.name.common}&appid=${api_key}`)
        .then(response => {
            console.log(response.data)
            setWeather(response.data)
        })
    }, [country])

  return (
    <div>
    <h1>{country.name.common}</h1>
    <p>Capital: {country.capital[0]}</p>
    <p>Population: {country.population}</p>
    <h2>Languages</h2>
    <ul>
        {
            Object.values(country.languages).map(language => <li key={language}>{language}</li>)
        }
    </ul>
    <img src={country.flags.png} alt={country.name.common} width='200px' />
</div>
  );
}
