import { handleGithubLogin } from '@/lib/action'
import { auth } from '@/lib/auth'

const Login = async () => {
    const session = await auth()

    console.log('session login', session)

  return (
      <form action={handleGithubLogin}>
        <button>Login with github</button>
      </form>
  )
}
export default Login
