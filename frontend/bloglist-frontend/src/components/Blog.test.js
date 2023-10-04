import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'The rambo bambo adventures',
    author: 'rambobambo'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('The rambo bambo adventures')
  expect(element).toBeDefined()
})