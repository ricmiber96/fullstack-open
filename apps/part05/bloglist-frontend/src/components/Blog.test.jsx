import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Blog from "./Blog";
import Togglable from "./Togglable";

describe("Blog", () => {
  // Evitar reenderizados duplicados
  afterEach(cleanup)
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
  it("renders content", () => {
    render(<Blog blog={blog} />);
  })

  it("renders title", () => {
    render(<Blog blog={blog} />)
    screen.getByText("React patterns | Michael Chan")
    //Dont get the url because is not visible
  })

  it('at start the children are not displayed', () => {
    const component = render(
      <Togglable buttonLabel="show..."/>
    )
    //View content of component
    //screen.debug()
    const div = component.container.querySelector('.togglable-content')
    expect(getComputedStyle(div).display).toBe('none')  

  })

  it('after clicking the button, children are displayed', () => {
    const component = render(<Blog blog={blog} />)
    fireEvent.click(screen.getByText('view'))
    screen.getByText('https://reactpatterns.com/')
  })

  it('like button is clicked twice', async() => {
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
    const component = render(<Blog blog={blog}/>)
    fireEvent.click(screen.getByText('view'))
    screen.debug()
    //const { getByText, getByTestId } = render(<Blog blog={blog} />);

    // Ensure the initial number of likes is rendered
    const likesElement = screen.getByText('likes: 7');
    console.log('Contenido',likesElement.textContent)
    expect(likesElement.textContent).toBe('likes: 7');

    const mockHandler = jest.fn()

    // Click the like button once
    const likeButton = screen.getByText('like');
    fireEvent.click(likeButton);
    // Click the like button a second time
    fireEvent.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2)

  })



  // it("renders title", () => {
  //   render(<Blog blog={blog} />)
  //   screen.getByText("React patterns")
  // })

})

