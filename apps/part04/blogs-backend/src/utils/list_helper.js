const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
}

const mostBlogs = (blogs) => {
  const authors = blogs.reduce((authors, blog) => {
    const author = authors.find(a => a.author === blog.author)
    if (author) {
      author.blogs++
    } else {
      authors.push({ author: blog.author, blogs: 1 })
    }
    return authors
  }, [])
  return authors.reduce((max, author) => max.blogs > author.blogs ? max : author)
}

const mostLikes = (blogs) => {
  const authors = blogs.reduce((authors, blog) => {
    const author = authors.find(a => a.author === blog.author)
    if (author) {
      author.likes += blog.likes
    } else {
      authors.push({ author: blog.author, likes: blog.likes })
    }
    return authors
  }, [])
  return authors.reduce((max, author) => max.likes > author.likes ? max : author)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
