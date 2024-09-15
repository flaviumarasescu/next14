import { connectToDb } from '@/lib/connection'
import { NextResponse } from 'next/server'
import { Post } from '@/lib/models'

export const GET = async (req, {params}) => {
    try {
        console.log('paramsff', params)
        const { slug } = params
        console.log('idfff', slug)
        connectToDb()
        const post = await Post.findOne({ slug })
        return NextResponse.json(post)
    } catch (e) {
        console.error(e)
        throw new Error('Failed to fetch blog')
    }
}
