import dynamic from 'next/dynamic';

const HydrationTestNoSSR = dynamic(() => import('@/components/hydrationTest'), {
  ssr: false,
});

export default function Home() {
  console.log('contact page it works');

  return (
    <main>
      Contact page
      <HydrationTestNoSSR />
    </main>
  );
}
