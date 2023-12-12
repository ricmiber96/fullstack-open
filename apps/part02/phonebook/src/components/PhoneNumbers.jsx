import React from 'react';
import contact from '../services/contact';

export default function PhoneNumbers({persons, handleDelete}) {



  return (
    <ul>
        {
        persons.map((person) => {
          return ( 
            <li key={person.id}>
              <p>{person.name} | {person.number}
                <button onClick={()=>handleDelete(person.id)}>Delete</button>
              </p>
            </li>
            )}
        )}
    </ul>
  );
}
