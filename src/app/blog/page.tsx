import { getPosts } from '@/lib/service'
import { Spinner } from '@nextui-org/spinner'
export const metadata = {
    title: 'Blog page',
    description: 'Blog page description',
}

const getData = async () => {
    const res = await fetch('http://localhost:3000/api/blog', {
        next: { revalidate: 3600 },
    })
    // throw new Error('Ooops')
    if (!res.ok) {
        throw new Error('Fetch error')
    }

    return res.json()
}

const Home = async () => {
    const posts = await getData()
    // const posts = await getPosts();
    console.log('posts', posts)

    return (
        <main>
            <Spinner />
            gggg
            {posts?.map((post: any) => <div key={post.id}>{post.title}</div>)}
        </main>
    )
}

export default Home
