import { useEffect, useState } from "react";
import { MoviesCategory } from "../../components/MoviesCategory";
import { MovieTrailer } from "../../components/MovieTrailer";
import {
  addNewDocument,
  isDocExist,
  removeDocument,
} from "../../context/firebase";
import { IMovie } from "../../Interfaces/IMovie";
import styles from "../styles/MovieDetails.module.css";

export default function MovieDatailsPage({ movie }: { movie: IMovie }) {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [data, setData] = useState("");
  const [IsInLibrary, setIsInLibrary] = useState<boolean>();

  const getResult = async (data: IMovie) => {
    let result = await isDocExist(data?.title);
    setIsInLibrary(result);
  };

  useEffect(() => {
    setData(localStorage.getItem("auth") || "");
    getResult(movie);
  }, []);
  return (
    <>
      <h1>Movie Details</h1>
      <div className={styles.container_moviedetails}>
        <div id="movie_poster" className={styles.img_container}>
          <img
            className={styles.img}
            src={movie?.posterLink}
            alt="Movie poster"
          />
        </div>
        <div className={styles.movie_info}>
          <div id="movie_title" className={styles.movie_title}>
            <p>{movie?.title}</p>
          </div>
          <div id="movie_rating" className={styles.movie_rating}>
            <p>{movie?.rating}/10</p>
          </div>
          <div id="movie_genres" className={styles.movie_genres_box}>
            {movie?.genres.map((genre) => (
              <div key={genre} className={styles.movie_genre}>
                <p>{genre}</p>
              </div>
            ))}
          </div>
          <div id="movie_summary" className={styles.movie_summary}>
            <p>{movie?.summary}</p>
          </div>
          <div className={styles.modal_btn} onClick={() => setModalShow(true)}>
            <p>Watch Trailer</p>
          </div>
          <>
            {data &&
              (IsInLibrary ? (
                <div
                  id="unfavorite_movie"
                  className={styles.modal_btn}
                  onClick={() => removeDocument(movie?.title || "")}
                >
                  <p>Remove from Library</p>
                </div>
              ) : (
                <div
                  id="favorite_movie"
                  className={styles.modal_btn}
                  onClick={() => addNewDocument(movie?.title || "")}
                >
                  <p>Add to Library</p>
                </div>
              ))}
          </>
        </div>
      </div>
      {movie && <MoviesCategory category={movie.genres[0]} />}
      <MovieTrailer
        isOpen={modalShow}
        movieLink={movie?.trailerLink}
        closeTrailer={() => setModalShow(false)}
      />
    </>
  );
}
export const getStaticPaths = async () => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/movies`,
    {
      method: "GET",
      headers: requestHeaders,
      mode: "cors",
    }
  );
  const movies: IMovie[] = await response.json();

  const paths = movies.map((movie) => {
    return {
      params: { id: movie._id },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: { params: { id: string } }) => {
  const id = context.params.id;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/movies/${id}`,
    {
      method: "GET",
      headers: requestHeaders,
      mode: "cors",
    }
  );
  const movie: IMovie = await response.json();

  return {
    props: { movie },
  };
};
