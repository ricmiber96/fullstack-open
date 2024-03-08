import React from 'react';

type Props = {
    // TODO: Define the component props
    totalExercises: number;
};

export const Total: React.FC<Props> = ({totalExercises}) => {
    return (
        <div>
            <p>
            Number of exercises {totalExercises}
            </p>
        </div>
    );
};

export default Total;