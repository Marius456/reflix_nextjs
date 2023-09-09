import Link from "next/link";
import { Nav } from "react-bootstrap";
import { IMovie } from "../Interfaces/IMovie";
import styles from  "./styles/MovieCard.module.css"

export function MovieCard(movie: IMovie) {
    return (
        <>
            <Nav.Link href={"/movies/" + movie._id} as={Link}>
                <div className={styles.movie_card}>
                    <div className={styles.img_container}>
                        <img className={styles.img} src={movie.posterLink} alt="Movie poster" />
                    </div>
                    <div className={styles.title}>
                        <p>{movie.title}</p>
                    </div>
                    <div className={styles.summary}>
                        {movie.summary}
                    </div>
                </div>
            </Nav.Link>
        </>
    )
}