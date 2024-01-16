import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterChange, searchChange } from '../reducers/filterReducer';

export default function Filters(props) {

    const [selectedOption, setSelectedOption] = useState('all');
    const dispatch = useDispatch()

    const filterStyle = {
        marginBottom: 10
      }

    
    const handleSearch = (value) => {
        console.log(value)
        dispatch(searchChange(value))
    }

    const handleFilter = (value) => {  
        console.log(value)
        dispatch(filterChange(value))
        setSelectedOption(value.toLowerCase())
    }


  return (
    <div style={filterStyle}>
      <label htmlFor="filter">Search</label>
      <input type="text" id="filter" onChange={(e)=>{handleSearch(e.target.value)}}/>
        <div>
            <p>Filter</p>
            <input type="radio" id="all" checked={selectedOption === 'all'}  name="filter" value="all" onChange={(e)=>{handleFilter(e.target.value)}}/> 
            <span>All</span>
            <br/>
            <input type="radio" id="important"  checked={selectedOption === 'important'}   name="filter" value="important" onChange={(e)=>{handleFilter(e.target.value)}}/>
            <span>Important</span>
            <br/>
            <input type="radio" id="non-important"  checked={selectedOption === 'non-important'}   name="filter" value="non-important" onChange={(e)=>{handleFilter(e.target.value)}}/>
            <span>Non-important</span>
        </div>
    </div>
  );
}
