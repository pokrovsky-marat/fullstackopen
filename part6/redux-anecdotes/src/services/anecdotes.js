const baseUrl = 'http://localhost:3001/anecdotes'
const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Ошибка получения записей из БД')
  }
  return response.json()
}
export default { getAll }
