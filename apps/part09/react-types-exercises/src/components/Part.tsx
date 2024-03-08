import React from 'react';
import { CoursePart } from '../utils/types';

type Props = {
    // TODO: Define the component props
    part: CoursePart
};

export const Part: React.FC<Props> = ({part }) => {
   switch (part.kind) {
         case "basic":
              return (
                <div>
                     <p>
                         <b> {part.name} {part.exerciseCount} </b>
                     </p>
                     <i>{part.description}</i>
                </div>
              );
         case "group":
              return (
                <div>
                     <p>
                        <b>  {part.name} {part.exerciseCount} </b>
                     </p>
                     <p>
                            project exercises {part.groupProjectCount}
                     </p>
                </div>
              );
         case "background":
              return (
                <div>
                     <p>
                       <b>   {part.name} {part.exerciseCount} </b>
                     </p>
                     <i>{part.description} </i>
                     <p>
                       submit to {part.backgroundMaterial}
                     </p>
                </div>
              );
         default:
              return null;
    }
};

export default Part;