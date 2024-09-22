import { handleGithubLogin, handleLogin } from '@/lib/action'
import { auth } from '@/lib/auth'

const Login = async () => {
    const session = await auth()

    console.log('session login', session)

    return (
        <>
            <form action={handleGithubLogin}>
                <button>Login with github</button>
            </form>

            <form action={handleLogin}>
                <input placeholder="username" name="username" type="username" />
                <input placeholder="password" name="password" type="password" />
                <button>Login with credentials</button>
            </form>
        </>
    )
}
export default Login
