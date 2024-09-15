import Links from './links/Links';
import { auth } from '@/lib/auth'

const Navbar = async () => {
    const session = await auth()

    console.log('session navbar', session)


  return (
    <section>
      <Links session={session}/>
    </section>
  );
};

export default Navbar;
