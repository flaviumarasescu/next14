// import { Params } from 'react-router-dom';
import { ReadonlyURLSearchParams } from 'next/navigation'
import { getPost, getUser } from '@/lib/service'

interface BlogPostProps {
    params: { slug: string }
    searchParams: ReadonlyURLSearchParams
}

const getData = async (id: string | undefined) => {
    try {
        const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
            cache: 'no-store',
            // next: { revalidate: 3600 },
        })
        // }
        if (!res.ok) {
            throw new Error('Fetch error')
        }

        return res.json()
    } catch (e) {
        console.log('Error single blog', e)
    }
}

export const generateMetadata = async ({ params }) => {
    const { slug } = params

    // const post = await getPost([slug])
    const post = await getData(slug)
    console.log('post din generate meta', post)
    return {
        title: post[0]?.title,
        description: post[0]?.desc,
    }
}

// const BlogPost: React.FC<BlogPostProps> = ({ params, searchParams }) => {
const BlogPost = async ({ params, searchParams }: BlogPostProps) => {
    console.log('params', params)
    console.log('searchParams', searchParams)
    // const [postData , setPostData ] = useState()
    //
    // // const postData = await getData(params.[slug]);
    // useEffect(() => {
    //   const postData = getPost(params.[slug]);
    //   console.log('postData',postData)
    //   setPostData(postData)
    // }, [])

    // const postData = await getPost(params.[slug]).then((res) => res[0])
    const postData = await getData(params.slug)

    const userData = await getUser(postData?.userId)
    console.log('postDataff', postData)

    return (
        <main>
            <h1>Blog slug page</h1>
            <section>{postData?.desc}</section>
            <section>User data: {userData?.username}</section>
        </main>
    )
}

export default BlogPost
