import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
describe('Проверяем работу компонента Blog', () => {
      //mock function
    const onLike = vi.fn()
  beforeEach(() => {

    const blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      username: 'savant',
    }
    const user = { username: 'savant' }
    render(<Blog blog={blog} user={user} onLike={onLike} />)
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
  test('Ожидаем что дважны кликнув кнопку like, вызовем обработчик дважды', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(onLike.mock.calls).toHaveLength(2)
  })
})
