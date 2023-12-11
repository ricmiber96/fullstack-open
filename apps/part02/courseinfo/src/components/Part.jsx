import React from 'react';

export default function Part({part}) {
  return (
      <li>
        {part.name} {part.exercises}
      </li>
  );
}
