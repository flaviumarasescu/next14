import { createPost, deletePost } from '@/lib/action'

const ServerActionTestPage = () => {
    return (
        <section>
            <form action={createPost}>
                <input type="text" placeholder="title" name="title" />
                <input type="text" placeholder="desc" name="desc" />
                <input type="text" placeholder="slug" name="slug" />
                <input type="text" placeholder="userId" name="userId" />
                <button type="submit">Creat post</button>
            </form>
            <form action={deletePost}>
                <input type="text" placeholder="post id" name="id" />
                <button type="submit">Delete post</button>
            </form>
        </section>
    )
}

export default ServerActionTestPage
