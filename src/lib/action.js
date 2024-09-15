'use server'
import {createPostService, deletePostService} from '@/lib/service'
import {revalidatePath} from "next/cache";
import { signIn, signOut } from '@/lib/auth'

export const createPost = async (formData) => {


    console.log('hello', formData)
    // const title = formData.get('title')
    // const desc = formData.get('desc')
    // const [slug] = formData.get('[slug]')
    // const userId = formData.get('userId')
    const { title, desc, slug, userId } = Object.fromEntries(formData)

    await createPostService({title, desc, slug, userId})
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
