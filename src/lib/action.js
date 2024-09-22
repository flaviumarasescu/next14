'use server'
import {
    createPostService,
    deletePostService,
    createUserService,
} from '@/lib/service'
import { revalidatePath } from 'next/cache'
import { signIn, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const createPost = async (formData) => {
    console.log('hello', formData)
    // const title = formData.get('title')
    // const desc = formData.get('desc')
    // const [slug] = formData.get('[slug]')
    // const userId = formData.get('userId')
    const { title, desc, slug, userId } = Object.fromEntries(formData)

    await createPostService({ title, desc, slug, userId })
    revalidatePath('/blog')
}

export const deletePost = async (formData) => {
    console.log('hello', formData)
    // const title = formData.get('title')
    // const desc = formData.get('desc')
    // const [slug] = formData.get('[slug]')
    // const userId = formData.get('userId')
    const { id } = Object.fromEntries(formData)

    await deletePostService(id)
    // revalidatePath('/blog')
}

export const handleGithubLogin = async () => {
    await signIn('github')
}

export const handleGithubLogout = async () => {
    await signOut('github')
}

export const handleRegister = async (formData) => {
    const { username, email, password } = Object.fromEntries(formData)

    const user = await createUserService({ username, email, password })
    console.log('new user', user)
    if (user?._id) {
        redirect('/blog')
    }
}

export const handleLogin = async (formData) => {
    const { username, email, password } = Object.fromEntries(formData)

    await signIn('credentials', { username, password })
    redirect('/blog')
    // try {
    // } catch (e) {
    //     throw new Error('Login error: ', e)
    // }
}
