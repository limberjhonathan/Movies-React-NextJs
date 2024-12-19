import axios, { AxiosError } from "axios";
import { Video } from "@/types/video";
// import { Movie } from "@/types/movie";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

interface ErrorResponse {
    status_message?: string;
}


export async function GetTrailer(movieId: string, language: string = "pt-BR") {
    try {
        const response = await api.get(`movie/${movieId}/videos`, {
            params: {
                api_key: API_KEY,
                language,
                include_adult: false
            }
        })

        return response.data.results as Video[]
    } catch {
        throw new Error("Erro ao buscar os vídeos do filme")
    }
}

export async function GetList(page: number = 1, language: string = "pt-BR") {
    try {
        const response = await api.get('discover/movie', {
            params: {
                api_key: API_KEY,
                language,
                include_adult: false,
                page,
            }
        })
        return { success: true, data: response.data };
    } catch (error) {
        const axiosError = error as AxiosError;
        return axiosError.response ? { 
            success: false, 
            error: axiosError.response.data as ErrorResponse 
        } : undefined;

    }

}

export async function GetDetails(movie_id: string, language: string = "pt-BR") {
    try {
        const response = await api.get(`movie/${movie_id}`, {
            params: {
                api_key: API_KEY,
                language,
                include_adult: false
            }
        })

        return response.data
    } catch {
        throw new Error("Erro ao buscar detalhes do filme")
    }
}

