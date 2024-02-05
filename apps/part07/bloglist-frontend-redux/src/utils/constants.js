const ENVIROMENT = {
  development: {
    API_URL: 'http://localhost:3001/api'
  },
  production: {
    API_URL: 'https://bloglist-backend-heroku.herokuapp.com/api'
  }
}

const getEnvVars = (env = import.meta.env) => {
  if (env.VITE_ENV === undefined) {
    return ENVIROMENT.development
  }
  if (env.VITE_ENV === 'development') {
    return ENVIROMENT.development
  }
  if (env.VITE_ENV === 'production') {
    return ENVIROMENT.production
  }
}

export default getEnvVars
