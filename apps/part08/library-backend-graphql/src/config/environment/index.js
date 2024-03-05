require('dotenv').config()

const port = process.env.PORT

const env = {
  development: process.env.NODE_ENV === 'development',
  test: process.env.NODE_ENV === 'test',
  production: process.env.NODE_ENV === 'production'

}

module.exports = {
  port,
  env
}
