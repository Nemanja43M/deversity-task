import express from "express";
import { searchCharacters } from "./controllers/charakterController";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/characters", searchCharacters);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
