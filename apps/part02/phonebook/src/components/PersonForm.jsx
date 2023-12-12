import React from 'react';

export default function PersonForm({addPerson, newPerson, handleOnChange}) {
  return (
    <div>
    <h3>Add New Contact </h3>
      <form onSubmit={addPerson}>
        <div>
          <label htmlFor="name">Name: </label>
          <input value={newPerson.name} name='name' onChange={handleOnChange}/>
          </div>
          <div>
          <label htmlFor="number">Number: </label>
          <input name='number' placeholder='000-000-000' onChange={handleOnChange} value={newPerson.number}/>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}
