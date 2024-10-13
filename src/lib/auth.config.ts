// @ts-nocheck

import { Session } from 'next-auth'
import { NextRequest } from 'next/server'
import { JWT } from 'next-auth/jwt'

interface User {
    id?: string
    username?: string
    email?: string
    isAdmin?: boolean
}

interface Token {
    id?: string
    username?: string
    email?: string
    isAdmin?: boolean
}

interface Auth {
    user?: User
}

interface CustomSession {
    user: User
}

interface JWTArgs {
    token: Token
    user: User
}

interface SessionArgs {
    session: CustomSession
    token: Token
}

interface AuthArgs {
    auth: Auth
    request: NextRequest
}

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    providers: [],
    callbacks: {
        async jwt({ token, user }: JWTArgs) {
            if (user) {
                token.id = user?.id
                token.username = user?.username
                token.email = user?.email
                token.isAdmin = user?.isAdmin
            }
            return token
        },
        // async session({ session, token }: SessionArgs) {
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token) {
                session.user = session.user || ({} as User)

                session.user.id = token?.id
                session.user.username = token?.username
                session.user.email = token?.email
                session.user.isAdmin = token?.isAdmin
            }
            return session
        },
        authorized({ auth, request }: AuthArgs) {
            const user = auth?.user
            const isOnAdminPanel =
                request.nextUrl.pathname?.startsWith('/admin')
            const isOnBlogPage = request.nextUrl.pathname?.startsWith('/blog')
            const isOnLoginPage = request.nextUrl.pathname?.startsWith('/login')

            if (isOnAdminPanel && !user?.isAdmin) {
                return false
            }

            if (isOnBlogPage && !user) {
                return false
            }

            if (isOnLoginPage && user) {
                return Response.redirect(new URL('/', request.nextUrl))
            }
            return true
        },
    },
}
