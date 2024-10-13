'use client'
import { usePathname } from 'next/navigation'

const BlogPage = ({ children, rsvps, events }: any) => {
    const path = usePathname()

    return (
        <section>
            {/*{path === '/blog' ? (*/}
            <div>
                <div>{rsvps}</div>
                <div>{events}</div>
                <div>{children}</div>
            </div>
            {/*) : (*/}
            {/*    <>{children}</>*/}
            {/*)}*/}
        </section>
    )
}

export default BlogPage
