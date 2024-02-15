import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ALL_BOOKS, ALL_GENRES } from '../../queries';



export default function Books({show, books}) {

      const [filter, setFilter] = useState('')
      const resultBooks = useQuery(ALL_BOOKS)
      const resultGenres = useQuery(ALL_GENRES)
      console.log('result', resultBooks)
      console.log('resultGenres', resultGenres)
      if (!show) {
        return null
      }
      const handleChange = (event) => {
        event.preventDefault()
       setFilter(event.target.value)
        
        console.log('genre', event.target.value)
        console.log('filteredBooks', filteredBooks)
      }
      const filteredBooks = books.filter((book) => filter !== '' ? book.genres.some(bookGenre => bookGenre.name === filter ) : books)
      console.log('books', filteredBooks)
  

  return (
    <div>
      <h2>books</h2>
        <div>
        in genre
        <select onChange={handleChange}>
          <option value=''>all genres</option>
          {resultGenres.data.allGenres.map((a) => (
            <option key={a.name} value={a.name}>{a.name}</option>
          ))}
        </select>
        </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td style={{textAlign: 'left'}}>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
