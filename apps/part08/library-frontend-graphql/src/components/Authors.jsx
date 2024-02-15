import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ALL_AUTHORS } from '../../queries';

export default function Authors({show, token}) {
    
  
      const authors = []
      const [name, setName] = useState('')
      const [born, setBorn] = useState(0)

   

        const EDIT_YEAR = gql`
        mutation editNumber($name: String!, $born: Int!) {
            editAuthor(
                name: $name,
                setBornTo: $born
            ) {
                name
                born
            }
        }
        `

      const [changeYear] = useMutation(EDIT_YEAR, {
            refetchQueries: [{ query: ALL_AUTHORS }]
        } )

      const handleSubmit = (event) => {
        event.preventDefault()
        changeYear({ variables: { name, born } })
      }

      const handleChange = (event) => {
        event.preventDefault()
       setName(event.target.value)
      }

    const result = useQuery(ALL_AUTHORS)
    if (result.loading)  {
        return <div>loading...</div>
    }
    if (!result.data) {
        return <div>no data</div>
    }
    else {
        authors.push(...result.data.allAuthors)
        console.log(authors)
    }

    if (!show) {
      return null
    }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        token ? (
          <>
          <h2>Set birthyear</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>name</label>
              <select value={name} onChange={handleChange}>
                {authors.map((a) => (
                  <option key={a.name} value={a.name}>{a.name}</option>
                ))}
              </select>
            </div>
            <div>
              born
              <input type="number" value={born}  onChange={({target}) => setBorn(parseInt(target.value))} />
            </div>
            <button type="submit">update author</button>
          </form>
          </>) : null
      }
     
    </div>
  );
}
