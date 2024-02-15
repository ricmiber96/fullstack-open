import { gql } from "@apollo/client";


export const LOGIN = gql`
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password){
            value
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
        title
        published
        author{
            name
            id
            born
            bookCount
          }
          id
        genres {
            name
            }
        }
    }
    `

 export const ALL_AUTHORS = gql`
    query {
        allAuthors {
        name
        born
        bookCount
        }
    }
    `

export const ALL_GENRES = gql`
    query {
        allGenres{
            name
        }
    }
`

