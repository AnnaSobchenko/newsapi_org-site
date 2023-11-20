import axios from "axios";
import { v4 as uuidv4 } from "uuid";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export async function getTopHeadlinesNewsApi({ params }) {
  console.log("params :>> ", params);
  const result = await axios
    .get("/top-headlines", {
      params: {
        country: params.country,
        category: params.category,
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
