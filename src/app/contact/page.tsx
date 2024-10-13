import dynamic from 'next/dynamic'

const HydrationTestNoSSR = dynamic(() => import('@/components/hydrationTest'), {
    ssr: false,
})

export default function Home() {
    return (
        <main>
            Contact page
            <HydrationTestNoSSR />
        </main>
    )
}
