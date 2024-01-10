import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from "./Blog";
import Togglable from "./Togglable";

describe("Blog", () => {
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
  afterEach(cleanup)

  let component



  beforeEach(() => { 
    component = render(<Blog blog={blog} />)
  })

  test("renders content", () => {
    render(<Blog blog={blog} />);
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


  it('like button is clicked twice',() => {
    const spyHandleUpdateLikes = jest.spyOn(Blog.prototype , 'handleUpdateLikes')
    const buttonMore = screen.getByText("View more");
    fireEvent.click(buttonMore);
    const likeButton = screen.getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(likeButton).toHaveTextContent('like');
    expect(handleUpdateLikes).toHaveBeenCalledTimes(2)
    spyHandleUpdateLikes.mockRestore()

  })


})

