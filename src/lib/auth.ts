// @ts-nocheck

import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { User } from '@/lib/models'
import { connectToDb } from '@/lib/connection'
import { User as NextAuthUser, Account, Profile } from 'next-auth'
import bcrypt from 'bcrypt'
import { authConfig } from '@/lib/auth.config'

const login = async (credentials: any) => {
    try {
        connectToDb()
        const user = await User.findOne({
            username: credentials.username,
        }).then((user) => {
            return {
                id: user?._id,
                username: user?.username,
                email: user?.email,
                isAdmin: user?.isAdmin,
                password: user?.password,
            }
        })

        if (!user) throw new Error('Wrong credentials!')

        const isPasswordCorrect = await bcrypt.compare(
            credentials?.password,
            user?.password
        )

        if (!isPasswordCorrect) throw new Error('Wrong credentials!')
        return user
    } catch (err) {
        console.log(err)
        throw new Error('Failed to login!')
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials)
                    return user
                } catch (err) {
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === 'github') {
                connectToDb()
                try {
                    const user = await User.findOne({ email: profile.email })

                    if (!user) {
                        const newUser = new User({
                            username: profile.login,
                            email: profile.email,
                            image: profile.avatar_url,
                        })

                        await newUser.save()
                    }
                } catch (err) {
                    console.log(err)
                    return false
                }
            }
            return true
        },
        ...authConfig.callbacks,
    },
})
