"use client";
import React from 'react';
import axios from "axios"
import './index.scss'
import { useEffect, useState } from "react"
import MovieCard from "../MovieCard";
import { Movie } from "@/types/movie";
// import ReactLoading from 'react-loading';
import { OrbitProgress } from 'react-loading-indicators';

export default function MovieList(){
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        getMovies()
    }, [])

    const getMovies = async () => {
        await axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: 'cfed136a7046b3428282a74772c85eb8',
                language: 'pt-BR',
                include_adult: false
            }
        }).then(response => {
            setMovies(response.data.results)
            console.log(response.data.results)
        })

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    if(isLoading) {
        return(
            <div className="loading-container">
                <OrbitProgress color="#bea422" size="medium" text="" textColor="" />
            </div>
        )
    }

    return(
        <ul className="movie-list">
            {movies.map((movie) => 
                <MovieCard 
                    key={movie.id}
                    movie={movie}
                />
            )}
        </ul>
    )
}