import { AuthService } from '@/services/auth.service'

export default {
  users: [],
  userMeta: {},
  currentUser: getCurrentUser()
}


function getCurrentUser () {
  if (AuthService.hasRefreshToken()) {
    const tokenData = _parseTokenData(localStorage.getItem('refreshToken'))
    const { id, name, username, email, role, image } = tokenData

    AuthService.setBearer(localStorage.getItem('refreshToken'))
    return {
      id,
      name,
      username,
      email,
      role,
      image
    }
  }

  return {
    id: '',
    role: '',
    name: '',
    email: ''
  }
}

function _parseTokenData (accessToken) {
  let payload = ''
  let tokenData = {}

  try {
    payload = accessToken.split('.')[1]
    tokenData = JSON.parse(atob(payload))
  } catch (error) {
    throw new Error(error)
  }

  return tokenData
}
