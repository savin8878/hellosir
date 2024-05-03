// app.js
import express from "express";
import cors from "cors";
import { setupRoutes } from "./routes.js";

const app = express();
app.use(express.json());
app.use(cors());

setupRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
