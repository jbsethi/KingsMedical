import $store from './store'
import vue from 'vue'


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
  const currentUserId = $store.state.user.currentUser.id
  const currentUserRole = $store.state.user.currentUser?.role?.name || null
  const canAccess = to.meta.canAccess

  if (currentUserId && canAccess && canAccess.includes(currentUserRole)) return next()
  if (currentUserId && canAccess && !canAccess.includes(currentUserRole)) {
    vue.prototype.$notify('Unautharized Access !')
    return next('/')
  }
  next()
}

export function setPageTitleMiddleware (to, from, next) {
  const pageTitle = to.matched.find(item => item.meta.title)

  if (pageTitle) window.document.title = pageTitle.meta.title
  next()
}