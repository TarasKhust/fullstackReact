<<<<<<< HEAD
import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const Nav = () => (
		<NavStyles>
			<Link href="/items"><a>Items</a></Link>
			<Link href="/sell"><a>Sell</a></Link>
			<Link href="/signup"><a>Signup</a></Link>
			<Link href="/orders"><a>Orders</a></Link>
			<Link href="/me"><a>Account</a></Link>
		</NavStyles>
);

export default Nav;
=======
import Link from 'next/link'
const Nav = () => (
		<div>
			<Link href="/sell"><a>Sell</a></Link>
			<Link href="/"><a>Home</a></Link>
		</div>
)

export default Nav
>>>>>>> 80cdc30... add meta
