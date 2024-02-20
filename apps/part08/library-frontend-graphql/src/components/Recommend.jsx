import { useQuery } from '@apollo/client';
import React from 'react';
import { FIND_BOOKS_BY_AUTHOR_OR_GENRE } from '../../queries';

export default function Recommend({show, books, user}) {

  const {loading, error, data} = useQuery(FIND_BOOKS_BY_AUTHOR_OR_GENRE, {
    variables: {genre: user.me.favoriteGenre}
  })

    if (!show) {
        return null
    }
 
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log('data', data)
    const actualUser = user.me
    // FILTER BOOKS BY USER FAVORITE GENRE ON FRONTEND
    // const filteredBooks = books.filter((book) => actualUser.favoriteGenre !== '' ? book.genres.some(bookGenre => bookGenre.name === actualUser.favoriteGenre ) : books)

    // FILTER BOOKS BY USER FAVORITE GENRE ON BACKEND
    const filteredBooks = data.findBookByAuthorOrGenre

  return (
    <div>
      <h2>recommendations</h2>
        <p>books in your favorite genre <strong>{actualUser.favoriteGenre}</strong></p>
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
