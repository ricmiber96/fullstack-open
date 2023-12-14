
export const BASE_URL =  import.meta.env.VITE_APP_ENV === 'production' ? 'https://phonebook-backend-beta.vercel.app/api/persons' : 'http://localhost:3001/api/persons'