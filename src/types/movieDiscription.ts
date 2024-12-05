export interface ProductionCompany {
    id: number;
    logo_path: string,
    name: string;
}

export interface MovieDiscription{
    id: number
    title: string,
    poster_path: string,
    overview: string,
    vote_average: number,
    vote_count: number,
    popularity: number,
    production_companies: ProductionCompany[];
}