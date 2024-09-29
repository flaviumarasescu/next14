'use client'

import { handleLogin } from '@/lib/action'
import { useActionState, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
    const [state, formAction] = useFormState(handleLogin, undefined)
    console.log('statefff', state)
    // const router = useRouter()
    //
    // useEffect(() => {
    //     state?.success && router.push('/login')
    // }, [state?.success])

    return (
        <>
            <form action={formAction}>
                <input placeholder="username" name="username" type="username" />
                <input placeholder="password" name="password" type="password" />
                <button>Login with credentials</button>
            </form>
            {state?.error && state?.error}
        </>
    )
}

export default LoginForm
