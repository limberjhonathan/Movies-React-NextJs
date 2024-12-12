import Link from 'next/link'
import './index.scss'

export interface Props {
    currentPage: number | undefined
}

export default function Pagination({ currentPage }: Props) {
    const page = currentPage ?? 1;
    const pageNumbers: number[] = [];
    const pageInitial = page < 3 ? 1 : page - 1
    const pageMax = pageInitial == 1 ? pageInitial + 3 : pageInitial + 2
    
    for (let pageNumber = pageInitial; pageNumber <= pageMax; pageNumber++) {
        pageNumbers.push(pageNumber);
    }

    

    return (
        <ul className="pagination">
            {page == 3 && 
                <Link className="page-btn" href='/movies/1'>Primeira</Link>
            }
            {page > 1 && 
                <a className="page-btn" href=''>Anterior</a>
            }
            {pageNumbers.map(page => (
                <Link key={page} className="page-btn" href={`/movies/${page}`}>{page}</Link>
            ))}
            <a className="page-btn" href=''>Próximo</a>
        </ul>
    )
}