import { connectToDb } from '@/lib/connection'
import { NextResponse } from 'next/server'
import { Post } from '@/lib/models'

export const GET = async (req, res) => {
    try {
        connectToDb()
        const posts = await Post.find()
        return NextResponse.json(posts)
    } catch (e) {
        console.error(e)
        throw new Error('Failed to fetch blog')
    }
}
