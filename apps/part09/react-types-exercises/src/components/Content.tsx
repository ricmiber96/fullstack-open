import React from 'react';
import {  CoursePart } from '../utils/types';
import Part from './Part';

type ContentProps = {
    // TODO: Define the component props
    arrayContent: CoursePart[];
};

export const Content: React.FC<ContentProps> = ({arrayContent }) => {
    return (
        <div>
            {
                arrayContent.map((part, index) => {
                    return (
                       <div key={index}>
                           <Part part={part} />
                          </div>
                    )
                })
            }
        </div>
    );
};

export default Content;