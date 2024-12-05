import { MovieDiscription } from "@/types/movieDiscription";
import './index.scss'
import StarRating from "../StartRating";

export interface Props {
  movie: MovieDiscription; // Torna a propriedade opcional
}

export default function MovieDescription({ movie }: Props) {
  return (
    <div className="description-content">
      <h2>{movie.title}</h2>
      <div className="img-container">
        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
      </div>
      <p>{movie.overview}</p>
      <StarRating
        rating={movie.vote_average}
      />
      <div>
        <h5>popularidade</h5>
        <p>{movie.popularity}</p>
      </div>

      <div>
        <h5>contagem de votos</h5>
        <p>{movie.vote_count}</p>
      </div>

      <div className="production-details">
        <h4>Empresas de produção</h4>
        <div className="production_companies">
          {movie.production_companies.map((product) => (
            product.logo_path ? (
              <img
                key={product.id}
                src={`https://image.tmdb.org/t/p/original${product.logo_path}`}
                alt={product.name}
              />
            ) : <p key={product.id}>{product.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
