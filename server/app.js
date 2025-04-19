import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.OPENSANCTIONS_API_KEY;

app.use(cors());

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

    const filteredResults = results.map((result) => {
      return {
        id: result.id,
        schema: result.schema,
        name: result.caption,
        country: result.properties.country?.[0],
        birthDate: result.properties.birthDate?.[0],
        birthPlace: result.properties.birthPlace?.[0],
        nationality: result.properties.nationality, // array
        address: result.properties.address?.[0], // return first address found in the result
        jurisdiction: result.properties.jurisdiction?.[0],
        position: result.properties.position?.[0],
      };
    });

    res.status(200).json({
      totalRecords,
      results: filteredResults,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch data" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
