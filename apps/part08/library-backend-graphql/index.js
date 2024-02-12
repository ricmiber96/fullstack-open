const { server } = require("./src/app")
const { startStandaloneServer } = require('@apollo/server/standalone')

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})