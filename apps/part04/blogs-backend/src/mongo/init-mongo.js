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
