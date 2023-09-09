export interface IMovie {
    _id: string;
    title: string;
    year: number;
    rating: number;
    summary: string;
    genres: [string];
    posterLink: string;
    trailerLink: string;
}