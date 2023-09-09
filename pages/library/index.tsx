import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { MovieCard } from "../../components/MovieCard";
import { queryForDocuments } from "../../context/firebase";
import { ILibrary } from "../../Interfaces/ILibrary";
import { IMovie } from "../../Interfaces/IMovie";
import "dotenv/config";

export default function Library() {
  const [movies, setMovies] = useState<IMovie[]>([]);

  const fetchData = async () => {
    let userFavorateMovies: ILibrary[] = await queryForDocuments();
    let movies: IMovie[] = [];
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    for (let index = 0; index < userFavorateMovies.length; index++) {
      const response = await fetch(
        `${process.env.SERVER_ADDRESS}/movies/title/${userFavorateMovies[index].movieTitle}`,
        {
          method: "GET",
          headers: requestHeaders,
          mode: "cors",
        }
      );
      movies.push(await response.json());
    }
    setMovies(movies);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Your favorite movies</h1>
      <Row
        md={2}
        xs={1}
        lg={3}
        className="g-3"
        style={{ marginBottom: "15px" }}
      >
        {movies.map((movie) => (
          <Col key={movie._id}>
            <MovieCard {...movie} />
          </Col>
        ))}
      </Row>
    </>
  );
}
