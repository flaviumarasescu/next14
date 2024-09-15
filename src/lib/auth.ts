import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { User } from '@/lib/models'
import { connectToDb } from '@/lib/connection'
import { User as NextAuthUser, Account, Profile } from 'next-auth'
const config= {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async signIn({
            user,
            account,
            profile,
        }: {
            user: NextAuthUser
            account: Account | null
            profile?: Profile
        }) {
            console.log('userf:', user)
            console.log('accountf:', account)
            console.log('profilef:', profile)
            if (account?.provider === 'github') {
                try {
                    await connectToDb()
                    const user = await User.findOne({ email: profile?.email })
                    if (!user) {
                        const newUser = new User({
                            username: profile?.name,
                            email: profile?.email,
                            image: profile?.avatar_url,
                        })
                        await newUser.save()
                    }
                } catch (e) {
                    console.log('err', e)
                    return false
                }
                return true
            }
            return false
        },
    },
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)
