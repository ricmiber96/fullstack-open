import React from 'react';
import { useState } from 'react';
import CountryItem from './CountryItem';

export default function Result({result}) {

    const [show, setShow] = useState(false)

    const handleClick = () => {
        setShow(!show)
    }

  return (
    <li>
        {result.name.common} <button onClick={handleClick}>Show</button>
        {
            show && <CountryItem country={result} />
        }
    </li>
  );
}
