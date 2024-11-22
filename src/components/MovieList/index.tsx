"use client";
import axios from "axios"
import './index.scss'
import { useEffect, useState } from "react"

export interface MovieType{
    id: number,
    title: string,
    poster_path: string,
    overview: string,
    vote_average: number,
}

export default function MovieList(){
    const [movies, setMovies] = useState<MovieType[]>([])

    useEffect(() => {
        getMovies()
    }, [])

    const getMovies = () => {
        axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: 'cfed136a7046b3428282a74772c85eb8',
                language: 'pt-BR'
            }
        }).then(response => {
            setMovies(response.data.results)
            console.log(response.data.results)
        })
    }

    return(
        <ul className="movie-list">
            {movies.map((movie) => 
                <li key={movie.id} className="movie-card">
                    <p>{movie.title}</p>
                    <p className="description">{movie.overview}</p>
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" />
                    <p>{movie.vote_average}</p>
                </li>
            )}
        </ul>
    )
}