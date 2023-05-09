export const GetInfo = (name) => {
  const userStr = localStorage.getItem(name)
  if (!userStr) return
  try {
    if (userStr) return JSON.parse(userStr)
    else return null
  } catch (error) {
    return null
  }
}

export const GetToken = () => {
  return localStorage.getItem('token' || null)
}

export const SetUserSession = (token, username, id) => {
  localStorage.setItem('token', token)
  localStorage.setItem('username', JSON.stringify(username))
  localStorage.setItem('id', JSON.stringify(id))
}

export const RemovedUserSession = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('id')
}
