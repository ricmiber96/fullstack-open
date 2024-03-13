import React from 'react';

type Props = {
    // TODO: Define the component props
    fill?: string;
    width?: number;
    heigth?: number;
};

export const HeartIcon: React.FC<Props> = ({width = 50, heigth = 50, fill = 'red'}) => {
    return (
        <svg
    width={width}
    height={heigth}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24">
    <path
      fill={fill}
      d="M2 9.137C2 14 6.02 16.591 8.962 18.911 10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138c0-4.863-5.5-8.312-10-3.636C7.5.825 2 4.274 2 9.137Z"
    />
  </svg>
    );
};

export default HeartIcon;