import $store from './store'

/**
 * Check access permission to auth routes
 */
export function checkAuthMiddleware (to, from, next) {
  const currentUserId = $store.state.user.currentUser.id
  const isAuthRoute = to.matched.some(item => item.meta.isAuth)

  if (isAuthRoute && currentUserId) return next()
  if (isAuthRoute) return next({ name: 'login' })
  next()
}


export function checkAccessMiddleware (to, from, next) {
  const currentUserRole = $store.state.user.currentUser.role
  const isAuthRoute = to.matched.some(item => item.meta.isAuth)
  const canAccess = to.meta.canAccess

  if (isAuthRoute && canAccess && canAccess.includes(currentUserRole)) return next()
  if (isAuthRoute && canAccess && !canAccess.includes(currentUserRole)) {
    $store.commit('toast/NEW', { type: 'error', message: 'Unautharized Access !' })
    return next('/')
  }
  next()
}

export function setPageTitleMiddleware (to, from, next) {
  const pageTitle = to.matched.find(item => item.meta.title)

  if (pageTitle) window.document.title = pageTitle.meta.title
  next()
}