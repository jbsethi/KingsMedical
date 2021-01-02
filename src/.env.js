export const API_PORT = '8000'
export const BASE_API = process.env.VUE_APP_BASE_API || `localhost:${API_PORT}`

export const API_URL = process.env.VUE_APP_API_URL || `http://${BASE_API}/api`
export const DOMAIN_TITLE = process.env.VUE_APP_DOMAIN_TITLE || 'Kings medical'

