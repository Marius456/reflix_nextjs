import { MoviesCategory } from "../../components/MoviesCategory";
import "dotenv/config";

export default function Categories({ categories }: { categories: string[] }) {
  return (
    <>
      <h1>Categories</h1>
      {categories.map((cat) => (
        <MoviesCategory category={cat} />
      ))}
    </>
  );
}

export async function getStaticProps() {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");

  const response = await fetch(`${process.env.SERVER_ADDRESS}/movies/genres`, {
    method: "GET",
    headers: requestHeaders,
    mode: "cors",
  });
  const categories = await response.json();

  return {
    props: {
      categories,
    },
  };
}
