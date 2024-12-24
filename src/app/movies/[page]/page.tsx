"use client";
import React from 'react';
import './page.scss'
import { useEffect, useState } from "react"
import { Movie } from "@/types/movie";
import { OrbitProgress } from 'react-loading-indicators';
import { GetList } from '@/app/services/movieServices';
import MovieCard from '@/components/MovieCard';
import Pagination from '@/components/Pagination';
import { useRouter } from 'next/navigation';

interface ErrorResponse {
    status_message?: string;
}

interface Props {
    params: { page: string }
}

export default function MovieList({ params }: Props) {
    const router = useRouter();

    const [movies, setMovies] = useState<Movie[] | undefined>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [page, setPage] = useState<number>(1);
    const [nextPage, setNextPage] = useState<boolean>(true)
    // const [lastPage, setLastPage] = useState<number>(0);

    useEffect(() => {
        const getMovies = async () => {
            const resolveParam = await params;
            const pageNumber = parseInt(resolveParam.page);
            setPage(pageNumber);

            const hasNextPage = await GetList(pageNumber + 1);
            if (!hasNextPage?.success) {
                const error = hasNextPage?.error as ErrorResponse;

                const errorMessage = error?.status_message

                const regex = /max at (\d+)/;
                const match = errorMessage?.match(regex);

                const maxPage = match ? parseInt(match[1]) : 0;
                // setLastPage(maxPage)

                if (pageNumber > maxPage) {
                    console.log(`Redirecionando para a página ${maxPage}`);
                    router.push(`/movies/${maxPage}`);
                    return;
                }
            }
            console.log("passei por aqui")
            const moviesList = await GetList(pageNumber);
            setMovies(moviesList?.success ? moviesList.data.results : []);

            setNextPage(hasNextPage?.success ?? false);
            setIsLoading(false);

        };
        getMovies();
    }, [params, router]);

    if (isLoading) {
        return (
            <div className="loading-container">
                <OrbitProgress color="#bea422" size="medium" text="" textColor="" />
            </div>
        )
    }
    // console.log(movies, "<<<<<<<<<<<filmes")

    return (
        <div>
            <title>Filmes</title>
            <ul className="movie-list">
                {movies?.map((movie) =>
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />
                )}
            </ul>
            <Pagination currentPage={page} nextPage={nextPage} />
        </div>
    )
}