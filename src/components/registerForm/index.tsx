'use client'

import { useActionState } from 'react'
import { handleRegister } from '@/lib/action'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

const RegisterForm = () => {
    const [state, formAction] = useFormState(handleRegister, undefined)
    const router = useRouter()

    useEffect(() => {
        state?.success && router.push('/login')
    }, [state?.success])

    return (
        <section>
            <h1>Register page</h1>
            <form action={formAction}>
                <input placeholder="username" type="text" name="username" />
                <input placeholder="email" type="email" name="email" />
                <input placeholder="password" type="password" name="password" />
                <button type="submit">Create user</button>
            </form>
            {state?.error && state?.error}
        </section>
    )
}

export default RegisterForm
