import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
describe('Проверяем работу компонента Blog', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    username: 'savant',
  }
  const user = { username: 'savant' }

  beforeEach(() => {
    render(<Blog blog={blog} user={user} />)
  })
  test('Хочу убедиться что Автор и название по умолчанию есть, а урла и лайков нет', async () => {
    const titleAndAuthor = screen.getByText('React patterns Michael Chan')
    //Если я хочу убедиться что элементов нет использую queryByText
    const url = screen.queryByText('https://reactpatterns.com/')
    const likes = screen.queryByText('7')

    expect(titleAndAuthor).toBeVisible()
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })
  test("blog's URL and number of likes are shown when the button controlling the shown details has been clicked.", async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText('https://reactpatterns.com/')
    const likes = screen.getByText('7')
    expect(url).toBeVisible()
    expect(likes).toBeVisible()
  })
})
