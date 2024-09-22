import Link from 'next/link'
import NavLink from './navLink/navLink'

import { handleGithubLogout } from '@/lib/action'
import styles from './links.module.css'

const Links = ({ session }) => {
    const links = [
        {
            title: 'Home page',
            path: '/',
        },
        {
            title: 'About',
            path: '/about',
        },
        {
            title: 'Contact',
            path: '/contact',
        },
        {
            title: 'Blog',
            path: '/blog',
        },
    ]
    // const session = true;
    const isAdmin = true

    return (
        <section>
            {links.map((link) => (
                <NavLink item={link} key={link.title} />
            ))}
            {session ? (
                <>
                    {session?.user?.isAdmin && (
                        <NavLink item={{ title: 'Admin', path: '/admin' }} />
                    )}
                    <form className={styles.logout} action={handleGithubLogout}>
                        <button>Logout</button>
                    </form>
                </>
            ) : (
                <>
                    <NavLink item={{ title: 'Login', path: '/login' }} />
                    <NavLink item={{ title: 'Register', path: '/register' }} />
                </>
            )}
        </section>
    )
}

export default Links
