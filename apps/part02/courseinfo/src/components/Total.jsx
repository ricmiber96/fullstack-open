import React from 'react';

export default function Total({parts}) {
  const totalCourseExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>Total of <b>{totalCourseExercises}</b> exercises </p>
  );
}
