import Link from 'next/link';
import './index.scss';

export default function NavBar() {
    return (
        <nav className="navbar">
            <Link href="/" className="page-title">
                Filmes
            </Link>
            <Link href='/movies/1'>
                Todos os filmes
            </Link>
        </nav>
    );
}
