"use client";
import React from 'react';
import './page.scss'
import { useEffect, useState } from "react"
import { Movie } from "@/types/movie";
import { OrbitProgress } from 'react-loading-indicators';
import { GetList } from '@/app/services/movieServices';
import MovieCard from '@/components/MovieCard';

interface Props{
    params: {page: string}
}

export default function MovieList({ params }: Props){
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const getMovies = async () => {
            const resolveParam = await params
            const page = parseInt(resolveParam.page)    
    
            const moviesList = await GetList(page);
            setMovies(moviesList)
            setIsLoading(false);
        }

        getMovies()
    }, [params])

    if(isLoading) {
        return(
            <div className="loading-container">
                <OrbitProgress color="#bea422" size="medium" text="" textColor="" />
            </div>
        )
    }
    
    console.log(movies, "<<<<<<<<<<<filmes")

    return(
        <ul className="movie-list">
            {movies?.map((movie) => 
                <MovieCard
                    key={movie.id}
                    movie={movie}
                />
            )}
        </ul>
    )
}