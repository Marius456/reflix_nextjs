import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../../components/MovieCard";
import { IMovie } from "../../Interfaces/IMovie";
import "dotenv/config";

export default function Movies({ movies }: { movies: IMovie[] }) {
  return (
    <>
      <h1>All movies</h1>
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

export async function getStaticProps() {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  const response = await fetch(`${process.env.SERVER_ADDRESS}/movies`, {
    method: "GET",
    headers: requestHeaders,
    mode: "cors",
  });
  const movies = await response.json();

  return {
    props: {
      movies,
    },
  };
}
