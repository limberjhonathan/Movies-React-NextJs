"use client";

import { useEffect, useState } from "react";
import { Video } from "@/types/video";
import VideoEmbed from "@/components/VideoEmbed";
import { GetTrailer, GetDetails } from "@/app/services/movieServices";
import MovieDescription from "@/components/MovieDescription";
import { MovieDiscription } from "@/types/movieDiscription";

interface Props {
  params: { id: string }
}

export default function MovieDetails({ params }: Props) {

  // const [movieDetails, setMovieDetails] = useState<Video[]>([]);
  const [dubladoVideos, setDubladoVideos] = useState<Video[]>([]);
  const [legendadoVideos, setLegendadoVideos] = useState<Video[]>([]);
  const [detailsMovie, setDetailsMovie] = useState<MovieDiscription>();

  useEffect(() => {
    const getDetailsMovie = async () => {
      try {
        const resolveParam = await params
        const movieDetails: MovieDiscription = await GetDetails(resolveParam.id)
        const videosTrailers: Video[] = await GetTrailer(resolveParam.id)
        
        const dublados = videosTrailers.filter((video: Video) =>
          video.name.includes("Dublado") || video.name.includes("oficial")
        );
        const legendados = videosTrailers.filter((video: Video) =>
          video.name.includes("Legendado")
        );

        setDubladoVideos(dublados);
        setLegendadoVideos(legendados);
        setDetailsMovie(movieDetails)
        // setMovieDetails(response.data.results);
      } catch  {
        console.error("Erro ao carregar os detalhes do filme:");
      }
    };

    getDetailsMovie();
  }, [params]);
  // console.log(movieDetails, 'tudo');
  // console.log(dubladoVideos, 'dublado')
  // console.log(legendadoVideos, 'legendado')
  const details = dubladoVideos.length > 0 ? dubladoVideos : legendadoVideos;
  console.log(detailsMovie)
  return (
    <div>
      {detailsMovie ? (
        <MovieDescription movie={detailsMovie} />
      ) : (
        <p>Carregando detalhes do filme...</p>
      )}

      {details.map((movie) => (
        <VideoEmbed key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
