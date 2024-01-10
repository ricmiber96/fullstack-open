import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import React from 'react';
import Blog from "../../src/components/Blog";

describe("Blog", () => {
  let component
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user:{
      id:'123',
      name:'jose'
    }
  }
  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()

  beforeEach(() => { 
    component = render(<Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>)
  })

  
  test("only title and author are displayed by default", () => {
    const div = component.container.querySelector(".blog-overview");
    expect(div).toBeDefined()
    expect(div).toHaveTextContent(blog.title);
    expect(div).toHaveTextContent(blog.author);
  })

  test("url and likes are displayed when the button is clicked", () => {
    const button = component.getByText("View more");
    fireEvent.click(button);
    const div = component.container.querySelector(".blog-content");
    expect(div).toBeDefined()
    expect(div).toHaveTextContent(blog.url);
    expect(div).toHaveTextContent(blog.likes);
  })


  it('like button is clicked twice',async() => {  
    const viewBtn = screen.getByText('View more')
    fireEvent.click(viewBtn)
    const likeBtn = screen.getByText('like')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)
    expect(updateBlog.mock.calls).toHaveLength(2)
  })


})

