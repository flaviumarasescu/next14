import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { User } from '@/lib/models'
import { connectToDb } from '@/lib/connection'
import { User as NextAuthUser, Account, Profile } from 'next-auth'
import bcrypt from 'bcrypt'

const login = async (credentials) => {
    try {
        await connectToDb()
        const user = await User.findOne({ username: credentials?.username })
        console.log('user from db', user)
        if (!user) {
            throw new Error('Wrong credentials')
        }
        const isPasswordCorrect = await bcrypt.compare(
            credentials?.password,
            user?.password
        )

        if (!isPasswordCorrect) {
            throw new Error('Wrong credentials')
        }

        return user
    } catch (e) {
        console.error(e)
        throw new Error('Failed to login!', e)
    }
}

const config = {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'jsmith',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                try {
                    console.log('credentials', credentials)
                    const user = await login(credentials)
                    return user
                } catch (e) {
                    return null
                }
            },
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
            console.log(
                "account?.provider === 'credentials'",
                account?.provider === 'credentials'
            )
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
            } else if (account?.provider === 'credentials') {
                console.log('in credentials')
                return true
            }
            return false
        },
    },
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)
