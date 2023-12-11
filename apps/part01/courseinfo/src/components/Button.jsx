
import React from 'react';

export default function Button({handleClick, text}) {
  return (
    <button style={{backgroundColor: '#00F', color:'#f22f'}} onClick={handleClick}>
        {text}
    </button>
  );
}
