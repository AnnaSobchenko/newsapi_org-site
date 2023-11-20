import { Suspense, useEffect, useState } from "react";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import Loader from "./Loader/Loader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArticlePage from "./Pages/ArticlePage/ArticlePage";
import { getTopHeadlinesNewsApi } from "./utils/fetchApi";

const initialState = {
  articles: [],
  filterCountry: "ua",
  filterCategory: "",
};

function App() {
  // const [articles, setArticles] = useState([]);
  const [appState, setAppState] = useState(initialState);
  const { filterCountry, filterCategory, articles } = appState;
  console.log("appState :>> ", appState);

  const getTopHeadlinesNews = async () => {
    const ar = await getTopHeadlinesNewsApi({
      params: { country: filterCountry, category: filterCategory },
    });
    console.log("ar :>> ", ar);
    await setAppState({ ...appState, articles: [...ar] });
  };

  useEffect(() => {
    getTopHeadlinesNews();
  }, [filterCountry, filterCategory]);
  // console.log("articles :>> ", appState.articles);
  return (
    <div className="App">
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
            <Route path="/:id" element={<ArticlePage appState={appState} />} />
          </Routes>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
