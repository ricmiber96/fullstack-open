import React from 'react';

export default function Part(props) {
  return (
    <div>
      <p>
        {props.parts.name} {props.parts.exercises}
      </p>
    </div>
  );
}
