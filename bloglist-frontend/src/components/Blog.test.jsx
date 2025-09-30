import { render, screen } from '@testing-library/react'

import Blog from './Blog'

test('Хочу убедиться что Автор и название по умолчанию есть, а урла и лайков нет', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  }

  render(<Blog blog={blog} />)

  const titleAndAuthor = screen.getByText('React patterns Michael Chan')
  //Если я хочу убедиться что элементов нет использую queryByText
  const url = screen.queryByText('https://reactpatterns.com/')
  const likes = screen.queryByText('7')

  expect(titleAndAuthor).toBeVisible()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})
