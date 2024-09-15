'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NavigationTestPage = () => {
  const navigation = useRouter();

  const handleClick = () => {
    navigation.push('/about');
  };

  return (
    <div>
      <Link href='/about' prefetch={true}>
        Click here
      </Link>
      <button onClick={handleClick}>Go to about</button>
    </div>
  );
};

export default NavigationTestPage;
