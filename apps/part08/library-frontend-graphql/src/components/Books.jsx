import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { ALL_BOOKS } from '../../queries';



export default function Books(props) {

      const books = []
      // const ALL_BOOKS = gql`
      // query {
      //     allBooks {
      //     title
      //     author
      //     published
      //     }
      // }
      // `
  
        const result = useQuery(ALL_BOOKS)


        if (result.loading)  {
            return <div>loading...</div>
        }
        if (!result.data) {
            return <div>no data</div>
        }
        else {
            books.push(...result.data.allBooks)
            console.log(books)
        }

  
        if (!props.show) {
          return null
        }

        console.log('books', books)
  

  return (
    <div>
      <h2>books</h2>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((a) => (
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
