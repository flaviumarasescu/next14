'use client';
import Link from 'next/link';
import styles from './navLink.module.css';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  item: {
    path: string;
    title: string;
  };
}

const NavLink: React.FC<NavLinkProps> = ({ item }) => {
  const pathname = usePathname();
  console.log('pathname', pathname);

  return (
    <>
      <Link
        href={item.path}
        className={`${styles.container}
      ${pathname === item.path && styles.active}
      `}
      >
        {' '}
        {item.title}
      </Link>
    </>
  );
};

export default NavLink;
