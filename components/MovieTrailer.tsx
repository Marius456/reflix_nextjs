import { Modal } from "react-bootstrap";
import styles from "./styles/MovieTrailer.module.css";

type MovieTrailerProps = {
  isOpen: boolean,
  movieLink?: string,
  closeTrailer: () => void
}

export function MovieTrailer({ isOpen, movieLink, closeTrailer }: MovieTrailerProps) {
  return (
    <Modal
      show={isOpen}
      onHide={closeTrailer}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles.modal}
      style={{ opacity: 1 }}
    >
      <div className={styles.modal_dialog}>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title id="contained-modal-title-vcenter">
            Movie trailer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <video id="movie_trailer" controls style={{width: "100%"}}>
            <source src={movieLink} />
          </video>
        </Modal.Body>
      </div>
    </Modal>
  );
}