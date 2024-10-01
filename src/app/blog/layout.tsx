'use client'
import { usePathname } from 'next/navigation'

const BlogPage = ({ children, rsvps, events }) => {
    const path = usePathname()
    console.log('pathhhhh', path)

    return (
        <section>
            {path === '/blog' ? (
                <div>
                    <div>{rsvps}</div>
                    <div>{events}</div>
                    <div>{children}</div>
                </div>
            ) : (
                <>{children}</>
            )}
        </section>
    )
}

export default BlogPage
