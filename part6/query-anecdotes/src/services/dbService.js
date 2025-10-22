const baseUrl = 'http://localhost:3001/anecdotes'
export const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Ошибка получения данных с сервера')
  }
  return response.json()
}
export const createAnecdote = async (anecdote) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote),
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    const message = await response.json()
    throw new Error(message.error)
  }

  return await response.json()
}
export const vote = async (anecdote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...anecdote, votes: anecdote.votes + 1 }),
  }

  const response = await fetch(`${baseUrl}/${anecdote.id}`, options)

  if (!response.ok) {
    throw new Error('Failed to create note')
  }

  return await response.json()
}
