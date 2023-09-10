import { useEffect, useState } from "react";
import { IMovie } from "../Interfaces/IMovie";
import styles from "./styles/MoviesCategory.module.css";

export function MoviesCategory({ category }: { category: string }) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const fetchData = async () => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/movies/genres/${category}`,
      {
        method: "GET",
        headers: requestHeaders,
        mode: "cors",
      }
    );
    setMovies(await response.json());
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <>
      <div
        id="container_categories_list"
        className={styles.container_categories_list}
      >
        <div className={styles.category_title}>
          <p>{category}</p>
        </div>
        <div id={"container_" + category} className={styles.container_category}>
          {movies.map((movie) => (
            <div
              key={movie._id}
              className={styles.card_category}
              onClick={() => (window.location.href = "/movies/" + movie._id)}
            >
              <div className={styles.img_container}>
                <img
                  className={styles.img}
                  src={movie.posterLink}
                  alt="Movie poster"
                />
              </div>
              <div className={styles.title}>
                <p>{movie.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
