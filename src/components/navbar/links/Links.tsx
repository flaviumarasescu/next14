'use client'
import Link from 'next/link'
import NavLink from './navLink/navLink'

import {
    createPost,
    createPrePopulatedPost,
    handleGithubLogout,
} from '@/lib/action'
import styles from './links.module.css'
import { useTransition } from 'react'

const Links = ({ session }: any) => {
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

    const [isPending, startTransition] = useTransition()

    const handleClick = () => {
        startTransition(() => {
            createPrePopulatedPost()
        })
    }

    return (
        <section>
            {links.map((link) => (
                <NavLink item={link} key={link.title} />
            ))}
            {typeof session === 'object' && session !== null ? (
                <>
                    {session?.user?.isAdmin && (
                        <>
                            <NavLink
                                item={{ title: 'Admin', path: '/admin' }}
                            />
                            <button onClick={handleClick}>Create post</button>
                        </>
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
