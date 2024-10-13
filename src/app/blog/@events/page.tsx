const Events = async () => {
    const getData = async () => {
        const res = await fetch('http://localhost:3000/api/blog', {
            next: { revalidate: 3600 },
        })
        throw new Error('Ooops')
        if (!res.ok) {
            throw new Error('Fetch error')
        }

        return res.json()
    }
    const posts = await getData()

    return (
        <>{posts?.map((post: any) => <div key={post.id}>{post.title}</div>)}</>
    )
    // return 'events'
}
export default Events
