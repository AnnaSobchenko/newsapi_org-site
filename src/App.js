import { Suspense, useEffect, useState } from "react";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import Loader from "./Loader/Loader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArticlePage from "./Pages/ArticlePage/ArticlePage";
import {
  getMaxQuantityPagesApi,
  getTopHeadlinesNewsApi,
} from "./utils/fetchApi";
import "@fontsource/noto-sans";
import "@fontsource/noto-sans/500.css";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Noto Sans",
    fontWeight: 500,
    fontSize: 14,
  },
});

const initialState = {
  articles: [],
  filterCountry: "ua",
  filterCategory: "",
  q: "",
  pageSize: 5,
  page: 1,
  maxCount: 20,
};

function App() {
  const [appState, setAppState] = useState(initialState);
  const { filterCountry, filterCategory, q, pageSize, page } = appState;

  const getTopHeadlinesNews = async () => {
    const ar = await getTopHeadlinesNewsApi({
      params: {
        country: filterCountry,
        category: filterCategory,
        q: q,
        pageSize: pageSize,
        page: page,
      },
    });
    console.log("ar :>> ", ar);
    await setAppState({ ...appState, articles: [...ar] });
  };

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
    console.log("ar :>> ", ar.length);
    await setAppState({ ...appState, maxCount: ar.length });
  };

  // useEffect(() => {
  //   getTopHeadlinesNews();
  // }, [filterCountry, filterCategory, q, page]);

  // useEffect(() => {
  //   getMaxQuantityPages();
  // }, [pageSize]);

  // console.log("articles :>> ", appState.articles);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter basename="/">
          <Suspense fallback={Loader}>
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage appState={appState} setAppState={setAppState} />
                }
              />
              <Route
                path="/:id"
                element={<ArticlePage appState={appState} />}
              />
            </Routes>
            <Footer />
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
