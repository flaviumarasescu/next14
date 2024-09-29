import { handleGithubLogin, handleLogin } from '@/lib/action'
import { auth } from '@/lib/auth'
import LoginForm from '@/components/loginForm'

const Login = async () => {
    const session = await auth()

    console.log('session login', session)

    return (
        <>
            <form action={handleGithubLogin}>
                <button>Login with github</button>
            </form>

            <LoginForm />
        </>
    )
}
export default Login
