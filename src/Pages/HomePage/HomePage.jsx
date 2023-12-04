import {
  Container,
  Grid,
  List,
  ListItem,
  Box,
  Button,
  TablePagination,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";

import { styled, alpha } from "@mui/material/styles";
import ArticlesItem from "../../Components/ArticlesItem/ArticlesItem";
import { v4 as uuidv4 } from "uuid";
import Filter from "../../Components/Filter/Filter";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useEffect, useRef, useState } from "react";
import { getMaxQuantityPagesApi } from "../../utils/fetchApi";
import { throttle } from "lodash";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const HomePage = ({ appState, setAppState }) => {
  const [maxCount, setMaxCount] = useState(100);
  const [open, setOpen] = useState(false);
  const { q, page, pageSize, filterCountry, filterCategory } = appState;

  const getMaxQuantityPages = async () => {
    const ar = await getMaxQuantityPagesApi({
      params: {
        country: filterCountry,
        category: filterCategory,
        q: q,
        pageSize: 100,
        page: page,
      },
    });
    await setMaxCount(ar.length);
  };

  const getRowsPerPageOptions = (maxCount, sizePage) => {
    const rowsPerPageOptions = [
      5,
      maxCount,
      Math.round(maxCount / 10) * 5,
      sizePage,
    ];

    const sortArray = Array.from(new Set(rowsPerPageOptions)).sort(
      (a, b) => a - b
    );
    return sortArray;
  };

  const handleInputChangeThrottled = useRef(
    throttle(async (newValue) => {
      await setAppState({ ...appState, q: newValue });
    }, 1000)
  ).current;

  const handleInputChange = async (e) => {
    const newValue = e.target.value;

    handleInputChangeThrottled(newValue);
  };

  const rowsPerPageOptions = getRowsPerPageOptions(maxCount, pageSize);

  useEffect(() => {
    getMaxQuantityPages();
  }, [filterCategory, filterCountry, q]);
  return (
    <main>
      <Container sx={{ paddingTop: 4 }}>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search articles"
              inputProps={{ "aria-label": "search" }}
              sx={{ border: 1, borderRadius: 1, borderColor: "#ECF0F6" }}
              value={q}
              onChange={handleInputChange}
            />
          </Search>
          <Button
            style={{
              borderRadius: 7,
              backgroundColor: "#ECF0F6",
              width: 83,
              textTransform: "none",
              padding: 8,
              fontSize: "13px",
              color: "#1A232E",
              boxShadow: "none",
            }}
            variant="contained"
            startIcon={<FilterAltOutlinedIcon />}
            onClick={() => {
              setOpen(!open);
            }}
          >
            Filters
          </Button>
        </Box>
        {open && <Filter appState={appState} setAppState={setAppState} />}
        <List>
          <ListItem className="articlesItem">
            <Grid
              container
              width="100%"
              height="100%"
              spacing={0}
              backgroundColor="#efeff3"
            >
              <Grid item xs={1.5} className="articlesItem_item_grid">
                <Box>Image</Box>
              </Grid>
              <Grid item xs={2.4} className="articlesItem_item_grid">
                <Box>Title</Box>
              </Grid>

              <Grid item xs={1.8} className="articlesItem_item_grid">
                <Box>Author</Box>
              </Grid>

              <Grid item xs={3.45} className="articlesItem_item_grid">
                <Box>Description</Box>
              </Grid>
              <Grid
                item
                xs={1.55}
                justifyContent="center"
                textAlign="center"
                className="articlesItem_item_grid"
              >
                <Box>Publication date</Box>
              </Grid>

              <Grid
                item
                xs={1.25}
                justifyContent="center"
                textAlign="center"
                className="articlesItem_item_grid"
              >
                <Box>Origin url</Box>
              </Grid>
            </Grid>
          </ListItem>
          {Boolean(appState.articles) &&
            appState.articles.map((article) => {
              return <ArticlesItem article={article} key={uuidv4()} />;
            })}
        </List>
        <TablePagination
          component="div"
          count={maxCount}
          page={page - 1}
          onPageChange={(e, newPage) => {
            setAppState({ ...appState, page: newPage + 1 });
          }}
          rowsPerPage={pageSize}
          rowsPerPageOptions={rowsPerPageOptions}
          onRowsPerPageChange={(event) => {
            setAppState({
              ...appState,
              pageSize: parseInt(event.target.value, 10),
              page: 1,
            });
          }}
        />
      </Container>
    </main>
  );
};

export default HomePage;
