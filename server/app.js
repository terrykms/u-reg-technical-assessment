import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.OPENSANCTIONS_API_KEY;

app.get("/search", async (req, res) => {
  const { q, filter, page, limit } = req.query;

  let apiUrl = `https://api.opensanctions.org/search/default`;

  if (q) apiUrl += `?q=${q}`;

  if (filter === "individuals") {
    apiUrl += "&schema=Person";
  } else if (filter === "entities") {
    apiUrl += "&exclude_schema=Person";
  }

  if (limit) apiUrl += `&limit=${limit}`;
  if (limit && page)
    apiUrl += `&offset=${(parseInt(page) - 1) * parseInt(limit)}`;
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `ApiKey ${apiKey}`,
      },
    });
    if (!response.ok) {
      return res.status(response.status).json({ error: response.statusText });
    }
    const data = await response.json();
    const totalRecords = data.total?.value || 0;
    const results = data.results || [];

    res.status(200).json({
      totalRecords,
      results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch data" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
