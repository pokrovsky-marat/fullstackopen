export const getAll = async () => {
  const response = await fetch('http://localhost:3001/anecdotes')
  if (!response.ok) {
    throw new Error('Ошибка получения данных с сервера')
  }
  return response.json()
}
