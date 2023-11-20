import { Container, List, ListItem, ListItemText } from "@mui/material";
import ArticlesItem from "../../Components/ArticlesItem/ArticlesItem";
import { v4 as uuidv4 } from "uuid";
import { grey } from "@mui/material/colors";
import Filter from "../../Components/Filter/Filter";

const HomePage = ({ appState, setAppState }) => {
  return (
    <Container>
      <Filter appState={appState} setAppState={setAppState} />
      <List>
        <ListItem>
          <ListItemText
            primary="Image"
            sx={{
              width: "11%",
              height: "auto",
              backgroundColor: grey,
              textAlign: "center",
            }}
          />
          <ListItemText
            primary="Title"
            sx={{
              width: "22%",
              height: "auto",
              backgroundColor: grey,
              textAlign: "center",
            }}
          />
          <ListItemText
            primary="Author"
            sx={{
              width: "16%",
              height: "auto",
              backgroundColor: grey,
              textAlign: "center",
            }}
          />
          <ListItemText
            primary="Description"
            sx={{
              width: "29%",
              height: "auto",
              backgroundColor: grey,
              textAlign: "center",
            }}
          />
          <ListItemText
            primary="Publication date"
            sx={{
              width: "12%",
              height: "auto",
              backgroundColor: grey,
              textAlign: "center",
            }}
          />
          <ListItemText
            primary="Origin url"
            sx={{
              width: "10%",
              height: "auto",
              backgroundColor: grey,
              textAlign: "center",
            }}
          />
        </ListItem>
        {Boolean(appState.articles) &&
          appState.articles.map((article) => {
            return <ArticlesItem article={article} key={uuidv4()} />;
          })}
      </List>
    </Container>
  );
};

export default HomePage;
