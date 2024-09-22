// const users = [
//   {
//     id: 1,
//     name: 'John',
//     id: 2,
//     name: 'John',
//   },
// ];
//
// const posts = [
//   {
//     id: 1,
//     title: 'Post 1',
//     body: '...',
//     userId: 1,
//   },
//   {
//     id: 2,
//     title: 'Post 1',
//     body: '...',
//     userId: 1,
//   },
//   {
//     id: 3,
//     title: 'Post 1',
//     body: '...',
//     userId: 1,
//   },
//   {
//     id: 4,
//     title: 'Post 1',
//     body: '...',
//     userId: 1,
//   },
//   {
//     id: 5,
//     title: 'Post 1',
//     body: '...',
//     userId: 1,
//   },
// ];

import { Post, User } from '@/lib/models'
import { connectToDb } from '@/lib/connection'
import bcrypt from 'bcrypt'

export const getPosts = async () => {
    try {
        await connectToDb()
        const posts = await Post.find()
        return posts
    } catch (e) {
        console.error('err getPosts e', e)
    }
}

export const getPost = (slug) => {
    try {
        const post = Post.find({ slug })
        return post
    } catch (e) {
        console.error('err getPost e,', e)
    }
}

export const createPostService = async (data) => {
    try {
        await connectToDb()
        const post = Post.create(data)
        console.log('create post')
        return post
    } catch (e) {
        console.error('err getPost e,', e)
    }
}

export const deletePostService = async (id) => {
    try {
        await connectToDb()
        await Post.findByIdAndDelete(id)
        console.log('delete post')
    } catch (e) {
        console.error('err deletePostService e,', e)
    }
}

export const getUsers = async () => {
    try {
        await connectToDb()
        const posts = User.find()
        return posts
    } catch (e) {
        console.error('err getPosts e', e)
    }
}

export const getUser = (id) => {
    try {
        const post = User.findById(id)
        return post
    } catch (e) {
        console.error('err getPost e,', e)
    }
}

// export const getPosts = () => posts;

// export const getPost = (id) => {
//   const post = posts.find((post) => {
//     return post.id === parseInt(id);
//   });
//   return post;
// };

export const createUserService = async (data) => {
    try {
        const { username, password } = data
        await connectToDb()

        const user = await User.findOne({ username })
        console.log('user already exist: ', user)
        if (user) {
            return 'Username already exists'
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        console.log('{ ...data, password: hashPassword }', {
            ...data,
            password: hashPassword,
        })

        const newUser = new User({ ...data, password: hashPassword })
        await newUser.save()
        return newUser
    } catch (e) {
        console.error('err create user:', e)
    }
}

export const loginService = async (data) => {
    try {
        const { username, password } = data
        await connectToDb()

        const user = await User.findOne({ username })
        console.log('user already exist: ', user)
        if (user) {
            return 'Username already exists'
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        console.log('{ ...data, password: hashPassword }', {
            ...data,
            password: hashPassword,
        })

        const newUser = new User({ ...data, password: hashPassword })
        await newUser.save()
        return newUser
    } catch (e) {
        console.error('err create user:', e)
    }
}
