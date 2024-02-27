import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, CREATE_BOOK } from '../../queries';

export default function NewBook(props) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

   

    // const CREATE_BOOK = gql`
    //     mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    //         addBook(title: $title, published: $published, author: $author, genres: $genres) {
    //             title
    //             author
    //             published
    //         }
    //   }
    // `

    const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS}, { query: ALL_GENRES }, { query: ALL_AUTHORS}],
    onError: (error) => {
      const message = error
      console.log('error', message)
    }
  })
  
  
  
    const handleSubmit  = async (event) => {
      event.preventDefault()
      try {
        console.log('variables', { title, author, published, genres })
        const result = await createBook({ variables: { title, published: parseInt(published), author, genres } })
        console.log('result', result)

        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')
      } catch (error) {
        console.log('error', error)
      }
    }
  
    const addGenre = () => {
      setGenres(genres.concat(genre))
      setGenre('')
    }
  
    if (!props.show) {
      return null
    }

    
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            title
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            published
            <input
              type="number"
              value={published}
              onChange={({ target }) => setPublished(target.value)}
            />
          </div>
          <div>
            <input
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
            <button onClick={addGenre} type="button">
              add genre
            </button>
          </div>
          <div>genres: {genres.join(' ')}</div>
          <button type="submit">create book</button>
        </form>
      </div>
  );
}
