import { gql } from "@apollo/client";


export const LOGIN = gql`
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password){
            value
        }
    }
`

export const CREATE_BOOK = gql`
    mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!){
        addBook(title: $title, published: $published, author: $author, genres: $genres){
            title
            published
            author{
                name
            }
            genres{
                name
            }
        }
    }
    `


export const ALL_BOOKS = gql`
    query {
        allBooks {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
    `

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        published
        author {
            name
        }
        genres {
            name
        }
    }
    `
export const FIND_BOOKS_BY_AUTHOR_OR_GENRE =  gql`
    query FindBookByAuthorOrGenre($author: String, $genre: String) {
      findBookByAuthorOrGenre(author: $author, genre: $genre) {
        title
        genres {
          name
        }
        author {
          name
        }
      }
    }
    `;

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

export const USER = gql`
    query {
        me {
            username
            favoriteGenre
        }
    }
`
