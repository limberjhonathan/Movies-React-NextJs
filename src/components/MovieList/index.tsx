"use client";
import axios from "axios"
import './index.scss'
import { useEffect, useState } from "react"
import MovieCard from "../MovieCard";
import { Movie } from "@/types/movie";

export default function MovieList(){
    const [movies, setMovies] = useState<Movie[]>([])

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
                <MovieCard 
                    key={movie.id}
                    movie={movie}
                />
            )}
        </ul>
    )
}