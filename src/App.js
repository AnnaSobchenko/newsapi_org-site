import { Suspense, useEffect, useState } from "react";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import Loader from "./Loader/Loader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArticlePage from "./Pages/ArticlePage/ArticlePage";
import { getTopHeadlinesNewsApi } from "./utils/fetchApi";
import "@fontsource/noto-sans";
import "@fontsource/noto-sans/500.css";
import "@fontsource/noto-sans/700.css";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Noto Sans",
    fontWeight: 500,
    fontSize: 14,
    body1: {
      fontWeight: 700,
    },
    body2: {
      fontWeight: 500,
      fontSize: 14,
    },
    h5: {
      fontWeight: 500,
    },
  },
});

const initialState = {
  articles: [],
  filterCountry: "ua",
  filterCategory: "general",
  q: "",
  pageSize: 5,
  page: 1,
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
    await setAppState({ ...appState, articles: [...ar] });
  };

  useEffect(() => {
    getTopHeadlinesNews();
  }, [filterCountry, filterCategory, q, page, pageSize]);

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
