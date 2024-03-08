import React from 'react';

type ContentProps = {
    // TODO: Define the component props
    arrayContent: {
        name: string;
        exerciseCount: number;
    }[]
};

export const Content: React.FC<ContentProps> = ({arrayContent }) => {
    return (
        <div>
        <p>
        {arrayContent[0].name} {arrayContent[0].exerciseCount}
        </p>
        <p>
        {arrayContent[1].name} {arrayContent[1].exerciseCount}
        </p>
        <p>
        {arrayContent[2].name} {arrayContent[2].exerciseCount}
        </p>
        </div>
    );
};

export default Content;