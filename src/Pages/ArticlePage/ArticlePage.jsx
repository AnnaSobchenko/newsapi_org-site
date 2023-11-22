import { Box, Container, SvgIcon, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const ArticlePage = ({ appState }) => {
  const { id } = useParams();
  const article =
    appState.articles.length && appState.articles.find((el) => el.id === id)
      ? appState.articles.find((el) => el.id === id)
      : JSON.parse(localStorage.getItem("article"));

  const {
    title,
    author,
    publishedAt,
    description,
    urlToImage,
    source,
    content,
  } = article;
  return (
    <main>
      <Container>
        <Box
          sx={{
            display: "flex",
            paddingTop: 4,

            marginBottom: 5,
          }}
        >
          <Link to="/">
            <SvgIcon
              component={ArrowBackOutlinedIcon}
              stroke="currentColor"
              width="100%"
              sx={{ marginRight: 1, paddingTop: 1 }}
            />
          </Link>
          <Typography variant="h5">{title}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2.5,
          }}
        >
          {source.name && (
            <Typography
              variant="body2"
              sx={{ color: "rgba(33, 41, 50, 0.54)" }}
            >
              Source: {source.name}
            </Typography>
          )}
          {publishedAt && (
            <Typography
              variant="body2"
              sx={{ color: "rgba(33, 41, 50, 0.54)" }}
            >
              Publication date: {publishedAt.slice(0, 10)}
            </Typography>
          )}
        </Box>
        {description && (
          <Box sx={{ marginBottom: 4 }}>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Description
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </Box>
        )}
      </Container>
      {urlToImage && (
        <Box sx={{ marginBottom: 4 }}>
          <img
            src={urlToImage}
            alt={title}
            width="100%"
            height="auto"
            loading="lazy"
          />
        </Box>
      )}
      <Container sx={{ paddingBottom: 7.5 }}>
        {content && (
          <Box sx={{ marginBottom: 4, fontWeight: 900 }}>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Content
            </Typography>
            <Typography variant="body2">{content}</Typography>
          </Box>
        )}
        {author && (
          <Typography variant="body2" sx={{ color: "rgba(33, 41, 50, 0.54)" }}>
            Author: {author}
          </Typography>
        )}
      </Container>
    </main>
  );
};

export default ArticlePage;
