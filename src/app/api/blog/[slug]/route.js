import { connectToDb } from '@/lib/connection'
import { NextResponse } from 'next/server'
import { Post } from '@/lib/models'

export const GET = async (req, { params }) => {
    try {
        const { slug } = params
        connectToDb()
        const post = await Post.findOne({ slug })
        return NextResponse.json(post)
    } catch (e) {
        console.error(e)
        throw new Error('Failed to fetch blog')
    }
}
