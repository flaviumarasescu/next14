export const authConfig = {
    pages: {
        signIn: '/login',
    },
    providers: [],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user?.id
                token.username = user?.username
                token.email = user?.email
                token.isAdmin = user?.isAdmin
            }
            console.log('userjwt', user)
            console.log('tokenjwt', token)
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token?.id
                session.user.username = token?.username
                session.user.email = token?.email
                session.user.isAdmin = token?.isAdmin
            }
            return session
        },
        authorized({ auth, request }: any) {
            console.log('authffgg', auth)
            console.log('request.nextUrl', request.nextUrl)
            const user = auth?.user
            const isOnAdminPanel =
                request.nextUrl.pathname?.startsWith('/admin')
            const isOnBlogPage = request.nextUrl.pathname?.startsWith('/blog')
            const isOnLoginPage = request.nextUrl.pathname?.startsWith('/login')

            if (isOnAdminPanel && !user?.isAdmin) {
                return false
            }

            // if (isOnBlogPage && !user) {
            //     return false
            // }

            if (isOnLoginPage && user) {
                return Response.redirect(new URL('/', request.nextUrl))
            }
            return true
        },
    },
}
