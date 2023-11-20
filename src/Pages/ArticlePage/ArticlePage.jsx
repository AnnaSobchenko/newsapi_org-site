import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

const ArticlePage = ({ appState }) => {
  const { id } = useParams();
  const { title, publishedAt, description, urlToImage } =
    appState.articles.find((el) => el.id === id);
  return (
    <>
      <Container>
        <h1>{title}</h1>
        <p>{description}</p>
        <p>{publishedAt.slice(0, 10)}</p>
      </Container>
      <img
        src={urlToImage}
        alt={description}
        width="100%"
        height="auto"
        loading="lazy"
      />
    </>
  );
};

export default ArticlePage;
