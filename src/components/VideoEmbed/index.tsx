import { Video } from "@/types/video"

export interface Props{
    movie: Video
}

export default function VideoEmbed(props: Props){
    const movie = props.movie
    return (
        <div>
            <h1>{movie.name}</h1>
            <iframe
                key={movie.id}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${movie.key}`}
                title={movie.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    )
}