import { Box, Grid, ListItem, ListItemText, SvgIcon } from "@mui/material";
import { Link } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import "./ArticlesItem.css";

const ArticlesItem = ({ article }) => {
  const { title, author, id, description, url, urlToImage, publishedAt } =
    article;

  return (
    <ListItem id={id} className="articlesItem">
      <Grid container width="100%" height="100%" spacing={0}>
        <Grid
          item
          xs={1.5}
          alignItems="center"
          justifyContent="center"
          className="articlesItem_item_grid"
        >
          {urlToImage ? (
            <Box width="100%" height={70} overflow={"hidden"}>
              <img
                src={urlToImage}
                alt={title.slice(0, 8)}
                loading="lazy"
                className="articlesItem_img"
              />
            </Box>
          ) : (
            <SvgIcon
              component={NoPhotographyIcon}
              stroke="currentColor"
              width="100%"
            />
          )}
        </Grid>
        <Grid item xs={2.4} className="articlesItem_item_grid">
          <Link to={`/${id}`} className="articlesItem_link">
            {title && (
              <ListItemText primary={title} className="articlesItem_title" />
            )}
          </Link>
        </Grid>

        <Grid item xs={1.8} className="articlesItem_item_grid">
          {author && (
            <ListItemText
              primary={author}
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                margin: 0,
              }}
            />
          )}
        </Grid>
        <Grid item xs={3.45} className="articlesItem_item_grid">
          {description && <ListItemText primary={description} />}
        </Grid>
        <Grid
          item
          xs={1.55}
          justifyContent="center"
          textAlign="center"
          justifyItems="center"
          className="articlesItem_item_grid"
        >
          <ListItemText primary={publishedAt.slice(0, 10)} />
        </Grid>

        <Grid
          item
          xs={1.25}
          justifyContent="center"
          textAlign="center"
          justifyItems="center"
          className="articlesItem_item_grid"
        >
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="articlesItem_link"
          >
            <SvgIcon component={LinkIcon} stroke="currentColor" />
          </a>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default ArticlesItem;
