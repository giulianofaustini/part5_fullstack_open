import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Blog } from '../components/Blog'
import userEvent from '@testing-library/user-event'

test('renders title and author but not URL. Likes 0 by default', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    likes: 0,
  }

  render(<Blog blog={blog} />)

  expect(screen.getByText(/Title: Test Blog Title/)).toBeDefined()
  expect(screen.getByText(/Author: Test Author/)).toBeDefined()
  expect(screen.getByText(/Likes: 0/)).toBeDefined()
  expect(screen.queryByText(/URL:/)).toBeNull()
})

test('renders the hidden blog info', () => {
  const blog = {
    title: 'Test Blog Title',
  }
  const { container } = render(<Blog blog={blog} />)
  const findByClassName = (className) =>
    container.querySelector(`.${className}`)
  const hiddenDiv = findByClassName('blog-info-hidden')
  expect(hiddenDiv).toBeDefined()
})


test('clicking the button shows the view info details', async () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    likes: 0,
  }

  const { container } = render(<Blog blog={blog} />)

  const findByClassName = (className) =>
    container.querySelector(`.${className}`)

  const showInfoButton = findByClassName('viewInfoButton')

  const mockHandler = jest.fn()

  showInfoButton.onclick = mockHandler

  const button = screen.getByText('view info')
  await userEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
