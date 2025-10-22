const baseUrl = 'http://localhost:3001/anecdotes'
const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Ошибка получения записей из БД')
  }
  return response.json()
}
const create = async (content) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, votes: 0 }),
  }
  const response = await fetch(baseUrl, options)
  if (!response.ok) {
    throw new Error('Ошибка сохранения записи в БД')
  }
  return response.json()
}
const vote = async (anecdote) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(anecdote),
  }
  const response = await fetch(`${baseUrl}/${anecdote.id}`, options)
  if (!response.ok) {
    throw new Error('Ошибка сохранения записи в БД')
  }
  return response.json()
}
export default { getAll, create, vote }
