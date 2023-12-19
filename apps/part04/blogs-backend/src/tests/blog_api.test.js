
const config = require('../utils/config')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog.model')
const helper = require('../utils/test_helper')

const api = supertest(app)
const initialBlogs = [
    {
        "_id": "65803b6b19b46112101bfda2",
        "title": "My First Blog Post",
        "author": "John Doe",
        "url": "https://example.com/my-first-blog-post",
        "likes": 10,
        "__v": 0
    },
    {
        "_id": "65803b8419b46112101bfda5",
        "title": "My Second Blog Post",
        "author": "John Doe",
        "url": "https://example.com/my-first-blog-post",
        "likes": 20,
        "__v": 0
    }
] 

beforeAll(async () => {
    const url = config.MONGO_DB_URI
    console.log(`Connecting to ${url}`)
    await mongoose.connect('mongodb://mongo/BlogDB')
    // await Blog.deleteMany({})
    // let blogObject = new Blog(initialBlogs[0])
    // await blogObject.save()
    // blogObject = new Blog(initialBlogs[1])
    // await blogObject.save()
    await helper.resetDatabase()
}, 100000)

  
describe('When there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(2)
    }, 100000)

    
    test('The unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })


})

describe('Viewing a specific blog', () => {
    test('Get the first blog', async () => {
        const notes = await api.get('/api/blogs')
        const noteToView = notes.body[0]
        const resultBlog = await api
            .get(`/api/blogs/${noteToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(resultBlog.body).toEqual(noteToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
        const validNonexistingId = '5a3d5da59070081a82a3445'
        await api
            .get(`/api/blogs/${validNonexistingId}`)
            .expect(404)
    })

})


describe('Addition of a new blog', () => {

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
                .expect(400)

            await api
                .post('/api/blogs')
                .send(incompleteBlogs[1])
                .expect(400)

            const response = await api.get('/api/blogs')
            expect(response.body).toHaveLength(initialBlogs.length)
        })


        test('A valid blog can be added', async () => {
            const newBlog = {
                title: 'My Third Blog Post',
                author: 'John Doe',
                url: 'https://example.com/my-third-blog-post',
                likes: 30
            }
            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            
            const response = await api.get('/api/blogs')
            const content = response.body.map(r => r.title)
            expect(response.body).toHaveLength(initialBlogs.length + 1)
            expect(content).toContain('My Third Blog Post')
        })

        test('A blog without a likes property will default to 0', async () => {
            const newBlog = {
                title: 'My Fourth Blog Post',
                author: 'John Doe',
                url: 'https://example.com/my-fourth-blog-post'
            }
        const response =  await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
                expect(response.body.likes).toBe(0)
        })
    
})

describe('Updating a blog', () => {
    test('Succeeds with status code 200 if id is valid', async () => {
        await helper.resetDatabase()
        const blogsAtStart = await api.get('/api/blogs')
        const blogToUpdate = blogsAtStart.body[0]
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
        expect(blogsAtEnd.body).toHaveLength(initialBlogs.length)
        const arrayLikes = blogsAtEnd.body.map(r => r.likes)
        expect(arrayLikes).toContain(updateBlog.likes)
    })
})



describe('Deleting a blog', () => {
    test('Succeeds with status code 204 if id is valid', async () => {
        await helper.resetDatabase()
        const blogsAtStart = await api.get('/api/blogs')
        const blogToDelete = blogsAtStart.body[0]
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        const blogsAtEnd = await api.get('/api/blogs')
        expect(blogsAtEnd.body).toHaveLength(initialBlogs.length - 1)
        const contents = blogsAtEnd.body.map(r => r.title)
        expect(contents).not.toContain(blogToDelete.title)
  
    })
    test('fails with statuscode 404 if blog does not exist', async () => {
        const validNonexistingId = '5a3d5da59070081a82a3445'
        await api
            .delete(`/api/blogs/${validNonexistingId}`)
            .expect(404)
    })
})


afterAll(() => {
    mongoose.connection.close()
})