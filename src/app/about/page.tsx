import Image from 'next/image';
import styles from './about.module.css';
const About = () => {
  return (
    <main>
      <div className={styles.imageContainer}>
        <Image
          alt='image'
          src='https://plus.unsplash.com/premium_photo-1718285552243-85861ac9e179?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          fill
        />
      </div>
    </main>
  );
};

export default About;
