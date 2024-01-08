db = db.getSiblingDB('BlogDB')
db = db.getSiblingDB('BlogDBTest')
db.createCollection('blog')
db.createCollection('user')

// db.user.insertMany([
//     {
//         username: 'root',
//         name: 'Superuser',
//     },
//     {
//         username: 'test',
//         name: 'Test User',
//     },
//     {
//         username: 'test2',
//         name: 'Test User 2',
//     }
// ])

db.blog.insertMany([
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
])