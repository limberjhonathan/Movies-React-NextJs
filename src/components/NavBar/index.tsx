import Link from 'next/link';
import './index.scss';

export default function NavBar() {
    return (
        <nav className="navbar">
            <Link href="/" className="page-title" aria-label="Página inicial - Filmes">
                Filmes
            </Link>
            <Link href='/movies/1' className='all-movies' aria-label="Ver todos os filmes">
                Todos os filmes
            </Link>
        </nav>
    );
}
