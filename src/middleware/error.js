 export default function errorMiddleware(err, req, res, next) {
  console.error(err);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename); 

  res.status(500).render("error", {
    message: "The external service is currently unavailable."
  });

 res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
} 