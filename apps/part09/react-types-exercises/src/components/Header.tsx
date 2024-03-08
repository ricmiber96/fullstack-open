import React from 'react';

type HeaderProps = {
    // TODO: Define the component props
    name: string;
};

export const Header: React.FC<HeaderProps> = ({name }) => {
    return (
        <div>
            <h1>{name}</h1>
        </div>
    );
};

export default Header;