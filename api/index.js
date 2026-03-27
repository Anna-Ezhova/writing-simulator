//Server Config for Vercel

import "dotenv/config";

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import sessionMiddleware from "../src/session/session.config.js";
import router from "../src/routes/routes.js";
import errorMiddleware from "../src/middleware/error.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const root = path.join(__dirname, "..");

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(root, "src/views"));

// static files
app.use(express.static(path.join(root, "public")));

app.use(sessionMiddleware);
app.use(router);


// 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(root, "public", "404.html"));
});

export default app;
