const Genre = require('../../../models/genre.model')

const genreQueries = {
  allGenres: async () => { return await Genre.find({}) }
}

module.exports = genreQueries
