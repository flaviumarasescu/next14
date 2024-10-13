'use server'
import {
    createPostService,
    deletePostService,
    createUserService,
    getCurrentUser,
} from '@/lib/service'
import { revalidatePath } from 'next/cache'
import { auth, signIn, signOut } from '@/lib/auth'
// import { redirect } from 'next/navigation'

export const createPost = async (formData: any) => {
    const { title, desc, slug, userId } = Object.fromEntries(formData)

    await createPostService({ title, desc, slug, userId })
    revalidatePath('/blog')
}

export const createPrePopulatedPost = async () => {
    const session = await auth()
    // const { title, desc, slug, userId } = Object.fromEntries(formData)
    //
    await createPostService({
        title: 'Test title',
        desc: 'Test desc',
        slug: 'slugTest',
        userId: session?.user?.id,
    })
    revalidatePath('/blog')
}

export const deletePost = async (formData: any) => {
    const { id } = Object.fromEntries(formData)

    await deletePostService(id)
    // revalidatePath('/blog')
}

export const handleGithubLogin = async () => {
    await signIn('github')
}

export const handleGithubLogout = async () => {
    'use server'
    await signOut()
}

export const handleRegister = async (previousState: any, formData: any) => {
    console.log('previousState', previousState)
    const { username, email, password } = Object.fromEntries(formData)

    const user = await createUserService({ username, email, password })
    return user
}

export const handleLogin = async (previousState: any, formData: any) => {
    const { username, email, password } = Object.fromEntries(formData)

    try {
        const res = await signIn('credentials', { username, password })
        console.log('res from db', res)
        return res
        // redirect('/blog')
    } catch (e) {
        console.log('err handleLogin', e)
        if (e instanceof Error && e.message.includes('CredentialsSignin')) {
            return { error: 'Invalid username or password' }
        }
        throw e
        // return { error: 'Something went wrong!' }
    }

    // redirect('/blog')
    // try {
    // } catch (e) {
    //     throw new Error('Login error: ', e)
    // }
}
