import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Blog } from '../components/Blog'

test('renders title and author, but not URL or likes by default', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    likes: 0,
  }

  render(<Blog blog={blog} />)

  expect(screen.getByText(/Title: Test Blog Title/)).toBeInTheDocument()
  expect(screen.getByText(/Author: Test Author/)).toBeInTheDocument()

  expect(screen.getByText(/Likes: 0/)).toBeInTheDocument()

  expect(screen.queryByText(/URL:/)).not.toBeInTheDocument()
})
