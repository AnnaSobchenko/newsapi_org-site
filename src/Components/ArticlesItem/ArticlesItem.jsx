import { Box, ListItem, ListItemText, SvgIcon } from "@mui/material";
import { Link } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import "./ArticlesItem.css";

const ArticlesItem = ({ article }) => {
  const { title, author, id, description, url, urlToImage, publishedAt } =
    article;

  return (
    <ListItem
      id={id}
      sx={{ border: 1, borderColor: "rgba(53, 61, 106, 0.08)" }}
    >
      <Link to={`/${id}`} className="articlesItem_link">
        {urlToImage ? (
          <img
            src={urlToImage}
            alt={description}
            width="11%"
            height={70}
            loading="lazy"
            className="articlesItem_img"
          />
        ) : (
          <Box
            sx={{
              width: "11%",
              height: 87,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 16px",
            }}
          >
            <SvgIcon component={NoPhotographyIcon} stroke="currentColor" />
          </Box>
        )}
        <ListItemText
          primary={title}
          sx={{
            width: "22%",
            height: "87px",
            padding: "8px 16px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            // whiteSpace: "nowrap",
            // WebkitLineClamp: 2,
            // WebkitBoxOrient: "vertical",
          }}
          className="articlesItem_title"
        />
        {author ? (
          <ListItemText
            primary={author}
            sx={{ width: "16%", padding: "8px 16px" }}
          />
        ) : (
          <Box sx={{ width: "16%" }} />
        )}
        <ListItemText
          primary={description}
          sx={{ width: "29%", height: "auto", padding: "8px 16px" }}
        />
        <ListItemText
          primary={publishedAt.slice(0, 10)}
          sx={{ width: "12%", height: "auto" }}
        />
      </Link>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="articlesItem_link"
      >
        <SvgIcon component={LinkIcon} stroke="currentColor" />
      </a>
    </ListItem>
  );
};

export default ArticlesItem;
