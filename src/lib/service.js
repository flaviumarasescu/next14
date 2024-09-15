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

import {Post, User} from "@/lib/models";
import {connectToDb} from "@/lib/connection";

export const getPosts = async () => {
  try{
    await connectToDb()
    const posts = await Post.find()
    return posts
  } catch (e) {
    console.error('err getPosts e', e)
  }
}

export const getPost = (slug) => {
  try{
    const post = Post.find({slug});
    return post;
  } catch (e) {
    console.error('err getPost e,', e)
  }

};

export const createPostService = (data) => {
  try{
    connectToDb()
    const post = Post.create(data);
    console.log('create post')
    return post;
  } catch (e) {
    console.error('err getPost e,', e)
  }

};

export const deletePostService = async (id) => {
  try{
    connectToDb()
    await Post.findByIdAndDelete(id);
    console.log('delete post')
  } catch (e) {
    console.error('err deletePostService e,', e)
  }

};

export const getUsers = () => {
  try{
    connectToDb()
    const posts = User.find()
    return posts
  } catch (e) {
    console.error('err getPosts e', e)
  }
}

export const getUser = (id) => {
  try{
    const post = User.findById(id);
    return post;
  } catch (e) {
    console.error('err getPost e,', e)
  }

};

// export const getPosts = () => posts;

// export const getPost = (id) => {
//   const post = posts.find((post) => {
//     return post.id === parseInt(id);
//   });
//   return post;
// };
