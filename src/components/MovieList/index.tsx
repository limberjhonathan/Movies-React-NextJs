"use client";
import React from 'react';
import './index.scss'
import { useEffect, useState } from "react"
import MovieCard from "../MovieCard";
import { Movie } from "@/types/movie";
import { OrbitProgress } from 'react-loading-indicators';
import { GetList } from '@/app/services/movieServices';

export default function MovieList(){
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    
    useEffect(() => {
        getMovies()
    }, [])

    const getMovies = async () => {
        const moviesList = await GetList();
        setMovies(moviesList)
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }

    console.log(movies)
    if(isLoading) {
        return(
            <div className="loading-container">
                <OrbitProgress color="#bea422" size="medium" text="" textColor="" />
            </div>
        )
    }

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