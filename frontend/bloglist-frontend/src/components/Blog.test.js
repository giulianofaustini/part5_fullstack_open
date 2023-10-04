
import { render, screen } from '@testing-library/react'
import { Blog } from './Blog'

test('renders title and author but not URL or likes by default', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5,
  }

  render(<Blog blog={blog} />)

  // Check that title and author are rendered
  const titleElement = screen.getByText('Title:')
  const authorElement = screen.getByText('Author: Test Author')

  // Check that URL and likes are not rendered
  const urlElement = screen.queryByText('URL:')
  const likesElement = screen.queryByText('Likes:')

  expect(titleElement).toBeInTheDocument()
  expect(authorElement).toBeInTheDocument()
  expect(urlElement).not.toBeInTheDocument()
  expect(likesElement).not.toBeInTheDocument()
})
