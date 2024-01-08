import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {
  let component
  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  }

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'React patterns'
    )
    expect(component.container).toHaveTextContent(
      'Michael Chan'
    )
  })
})
