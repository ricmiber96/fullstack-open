import React from 'react';

export default function Recommend({show, books, user}) {

    if (!show) {
        return null
    }

    const filteredBooks = books.filter((book) => user.favoriteGenre !== '' ? book.genres.some(bookGenre => bookGenre.name === user.favoriteGenre ) : books)

  return (
    <div>
      <h2>recommendations</h2>
        <p>books in your favorite genre <strong>{user.favoriteGenre}</strong></p>
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
