import React from 'react';

type Props = {
    // TODO: Define the component props
    width?: number;
    height?: number;
};

export const MaleIcon: React.FC<Props> = ({ width, height}) => {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={width}
        height={height}
        >
        <path
          fill="#0F0F0F"
          fillRule="evenodd"
          d="M15 3a1 1 0 0 1 1-1h4a2 2 0 0 1 2 2v4a1 1 0 1 1-2 0V5.413l-4.533 4.533c-.05.05-.104.093-.16.13a8 8 0 1 1-1.385-1.384c.037-.057.08-.11.13-.16L18.584 4H16a1 1 0 0 1-1-1ZM9 20.996A5.996 5.996 0 1 1 9 9.004a5.996 5.996 0 0 1 0 11.992Z"
          clipRule="evenodd"
        />
      </svg>
    );
};

export default MaleIcon;