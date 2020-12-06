import { AuthService } from '@/services/auth.service'

export default {
  namespaced: true,
  state: {
    accessTokenExpDate: getaccessTokenExpDate()
  },

  mutations: {
    SET_ATOKEN_EXP_DATE (state, expDate) {
      state.accessTokenExpDate = expDate
    }
  }
}

function getaccessTokenExpDate () {
  if (AuthService.hasRefreshToken()) {
    const tokenData = _parseTokenData(localStorage.getItem('refreshToken'))
    const { exp } = tokenData

    return exp
  }

  return ''
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
