import Link from 'next/link'
import './index.scss'
import { useState } from 'react';

export interface Props {
    currentPage: number | undefined;
    nextPage: boolean;
}

export default function Pagination({ currentPage, nextPage }: Props) {
    const page = currentPage ?? 1;
    const [selectedPage, setSelectedPage] = useState<number>(page);

    const pageNumbers: number[] = [];
    const pageInitial = page < 3 ? 1 : page - 1
    const pageMax = nextPage ? (pageInitial == 1 ? pageInitial + 3 : pageInitial + 2) : page;


    for (let pageNumber = pageInitial; pageNumber <= pageMax; pageNumber++) {
        pageNumbers.push(pageNumber);
    }

    const signal = (pageNum: number) => {
        setSelectedPage(pageNum)
    }

    return (
        <ul className="pagination">
            {page > 3 &&
                <Link className="page-btn" href='/movies/1'>Primeira</Link>
            }
            {page > 1 &&
                <a className="page-btn" href={`${page - 1}`}>Anterior</a>
            }
            {pageNumbers.map(page => (
                <Link key={page} className={`page-btn ${selectedPage === page ? 'selected' : ''}`} href={`/movies/${page}`} onClick={() => signal(page)}>{page}</Link>
            ))}
            {nextPage &&
                <a className="page-btn" href={`${page + 1}`}>Próximo</a>
            }
        </ul>
    )
}