import { gql, useQuery } from '@apollo/client';
import React from 'react';



export default function Books(props) {

      const books = []
      const ALL_BOOKS = gql`
      query {
          allBooks {
          title
          author
          published
          }
      }
      `
  
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
  

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td style={{textAlign: 'left'}}>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
