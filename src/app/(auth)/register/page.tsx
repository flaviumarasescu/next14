import { handleRegister } from '@/lib/action'

const Register = () => {
    return (
        <main>
            <h1>Register page</h1>
            <form action={handleRegister}>
                <input placeholder="username" type="text" name="username" />
                <input placeholder="email" type="email" name="email" />
                <input placeholder="password" type="password" name="password" />
                <button type="submit">Create user</button>
            </form>
        </main>
    )
}

export default Register
