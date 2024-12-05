/**
 * An array of routes that is accessible to the public
 * Authentication is not required for these routes
 * @type {string[]}
 */
export const publicRoutes = [
    '/',
    '/about',
    '/services',
    '/contact',
    '/faq',
    '/error',
]

/**
 * An array of routes that is used for authentications
 * Redirects loggedin users to dashboard
 * @type {string[]}
 */
export const authRoutes = [
    '/login',
    '/register',
    '/verify-token',
    '/forgot-password',
    '/reset-password',
]

/**
 * API authentication prefix
 * Routes with such prefixes are used for API Authentications
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * Default redirect path for logged in users
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard"


/**
 * Default redirect path for logged in users
 * @type {string}
 */
export const DEFAULT_ADMIN_REDIRECT = "/admin"