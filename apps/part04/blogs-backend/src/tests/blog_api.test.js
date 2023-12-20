
const config = require('../utils/config')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog.model')
const helper = require('../utils/test_helper')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const connectToMongoDB = require('./testSetup')
const disconnectFromMongoDB = require('./testSetup')

const api = supertest(app)

beforeEach(async () => {
    await connectToMongoDB()
    // await mongoose.connect('mongodb://mongo/BlogDB')
    // let blogObject = new Blog(initialBlogs[0])
    // await blogObject.save()
    // blogObject = new Blog(initialBlogs[1])
    // await blogObject.save()
    // await helper.resetDatabase()
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash("secret", 10)
    const newUser = {
       username: "root",
       name: "secret",
       blogs: [],
       passwordHash
    }
  
    await User.create(newUser)
}, 100000)



beforeEach(async () => {
    await Blog.deleteMany({})
    const users = await helper.usersInDb()
    const userInDB = users[0]
    const blogObjects = helper.initialBlogs
    .map(blog => new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: userInDB.id,
      likes: blog.likes ? blog.likes : 0
    }))
    const promiseArray = blogObjects.map(blog => {
        Blog.create(blog)
        userInDB.blogs = userInDB.blogs.concat(blog.id)
    })
    await Promise.all(promiseArray)

}, 100000)

  
describe('When there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    test('There are some blogs on API' , async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    }, 100000)

    
    test('The unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

})

describe('Viewing a specific blog', () => {
    // test('Get the first blog', async () => {
    //     const notes = await api.get('/api/blogs')
    //     const noteToView = notes.body[0]
    //     const resultBlog = await api
    //         .get(`/api/blogs/${noteToView.id}`)
    //         .expect(200)
    //         .expect('Content-Type', /application\/json/)
    //     expect(resultBlog.body).toEqual(noteToView)
    // })

    test('fails with statuscode 404 if blog does not exist', async () => {
        const validNonexistingId = '5a3d5da59070081a82a3445'
        await api
            .get(`/api/blogs/${validNonexistingId}`)
            .expect(404)
    })

})

describe('Add one user to the database', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    })

    test('A valid user can be added', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'johndoe',
            name: 'John Doe',
            password: 'secret'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('A user without a username or password is not added', async () => {
        const usersAtStart = await helper.usersInDb()
        const incompleteUsers = [
            {
                name: 'John Doe',
            }
        ]
        await api
            .post('/api/users')
            .send(incompleteUsers[0])
            .expect(400)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('A user with a username or password less than 3 characters is not added', async () => {
        const usersAtStart = await helper.usersInDb()
        const incompleteUsers = [
            {
                username: 'jo',
                name: 'John Doe',
                password: 'secret'
            },
            {
                username: 'johndoe',
                name: 'John Doe',
                password: 'se'
            }
        ]
        await api
            .post('/api/users')
            .send(incompleteUsers[0])
            .expect(400)
        await api
            .post('/api/users')
            .send(incompleteUsers[1])
            .expect(400)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

// describe('View blogs of a specific user', () => {

//     beforeEach(async () => {
//         const users = await api.get('/api/users')
//         const userToView = users.body[0]
//         const blogToPost = {
//             title: 'My First Blog Post',
//             autor: 'John Doe',
//             url: 'https://example.com/my-first-blog-post',
//             likes: 10,
//             user: {
//                 username: userToView.username,
//                 name: userToView.name,
//                 id: userToView.id
//             }
//         }
//         await api
//             .post('/api/blogs')
//             .send(blogToPost)
//             .expect(201)
//             .expect('Content-Type', /application\/json/)
//     })


//     test('Get the blogs of the first user', async () => {
//         const users = await api.get('/api/users')
//         const userToView = users.body[0]
//         const resultBlogs = await api
//             .get(`/api/blogs/user`)
//             .expect(200)
//             .expect('Content-Type', /application\/json/)
//         expect(resultBlogs.body[0].user).toEqual(userToView.id)
//     })
// })


describe('Addition of a new blog', () => {

    test('A valid blog can be added', async () => {
        const user = {
            username: "root",
            password: "secret",
          }
      
          const loginUser = await api
            .post('/api/login')
            .send(user)

        const newBlog = {
            title: 'My Blog',
            author: 'John Doe',
            url: 'https://example.com/my-third-blog-post',
            likes: 30
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${loginUser.body.token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
        const content = response.body.map(r => r.title)
        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(content).toContain('My Blog')
    })

        test('A blog without a title or url is not added', async () => {
            const incompleteBlogs = [
                {
                    author: 'John Doe',
                    url: 'https://example.com/my-first-blog-post',
                    likes: 10
                },
                {
                    title: 'My Second Blog Post',
                    author: 'John Doe',
                    likes: 10
                }
            ]
            await api
                .post('/api/blogs')
                .send(incompleteBlogs[0])
                .expect(401)

            await api
                .post('/api/blogs')
                .send(incompleteBlogs[1])
                .expect(401)

            const response = await api.get('/api/blogs')
            expect(response.body).toHaveLength(helper.initialBlogs.length)
        })


        

        test('A blog without a likes property will default to 0', async () => {
            // const body = await helper.loginAnUser(api)
            const user = {
                username: "root",
                password: "secret",
              }
          
              const loginUser = await api
                .post('/api/login')
                .send(user)

            const newBlog = {
                title: 'My Fourth Blog Post',
                author: 'John Doe',
                url: 'https://example.com/my-fourth-blog-post'
            }
             await api
                .post('/api/blogs')
                .send(newBlog)
                .set('Authorization', `bearer ${loginUser.body.token}`)
                .expect(201)
                .expect('Content-Type', /application\/json/)

                const response = await api.get('/api/blogs')
                expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
                expect(response.body.likes).toBe(0)
        })
    
})

describe('Deleting a blog', () => {
    test('Succeeds with status code 204 if id is valid', async () => {
        const body = await helper.loginAnUser(api)
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
            .set('Authorization', `Bearer ${body.token}`)
           
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
        const contents = blogsAtEnd.map(r => r.title)
        expect(contents).not.toContain(blogToDelete.title)
  
    })
    test('fails with statuscode 401 if token is not provided', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[blogsAtStart.length - 1]
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(401)
    })
    test('fails with statuscode 404 if token is provided and blog does not exist', async () => {
        const validNonexistingId = '5a3d5da59070081a82a3445'
        const body = await helper.loginAnUser(api)
        await api
            .delete(`/api/blogs/${validNonexistingId}`)
            .expect(404)
            .set('Authorization', `Bearer ${body.token}`)
    })
})

describe('Updating a blog', () => {
    test('Succeeds with status code 200 if id is valid', async () => {

        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        const updateBlog = {
            title: 'My First Blog Post',
            author: 'John Doe',
            url: 'https://example.com/my-first-blog-post',
            likes: 11
        }
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updateBlog)
            .expect(200)
        const blogsAtEnd = await api.get('/api/blogs')
        expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length)
        const arrayLikes = blogsAtEnd.body.map(r => r.likes)
        expect(arrayLikes).toContain(updateBlog.likes)
    })
})






afterAll(async() => {
   await disconnectFromMongoDB()
})