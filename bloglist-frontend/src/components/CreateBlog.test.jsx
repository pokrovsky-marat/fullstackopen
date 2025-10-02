import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

describe('Проверяем работу компонента BlogForm', () => {
  //mock function
  // const onCreate = vi.fn()
  //Если функция должна возвращать промис
  const onCreate = vi.fn().mockResolvedValue(true)
  beforeEach(() => {
    render(<CreateBlog onCreate={onCreate} />)
  })

  test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const user = userEvent.setup()
    const createButton = screen.getByText('create')

    const title = screen.getByLabelText('title')
    const author = screen.getByLabelText('author')
    const url = screen.getByLabelText('url')

    await user.type(title, 'test title')
    await user.type(author, 'test author')
    await user.type(url, 'test url')

    await user.click(createButton)

    expect(onCreate.mock.calls[0][0]).toEqual({
      title: 'test title',
      author: 'test author',
      url: 'test url',
    })
  })
})
