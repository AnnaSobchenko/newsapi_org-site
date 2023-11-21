import axios from "axios";
import { v4 as uuidv4 } from "uuid";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export async function getTopHeadlinesNewsApi({ params }) {
  const result = await axios
    .get("/top-headlines", {
      params: {
        country: params.country,
        category: params.category,
        q: params.q,
        pageSize: params.pageSize,
        page: params.page,
        apiKey: process.env.REACT_APP_API_KEY,
      },
    })
    .then(({ data }) => data.articles)
    .catch((err) => {
      throw err;
    });
  const articles = result.map((article) => {
    return { ...article, id: uuidv4() };
  });
  return articles;
}

export async function getMaxQuantityPagesApi({ params }) {
  const result = await axios
    .get("/top-headlines", {
      params: {
        country: params.country,
        category: params.category,
        q: params.q,
        pageSize: 100,
        page: params.page,
        apiKey: process.env.REACT_APP_API_KEY,
      },
    })
    .then(({ data }) => data.articles)
    .catch((err) => {
      throw err;
    });
  return result;
}
