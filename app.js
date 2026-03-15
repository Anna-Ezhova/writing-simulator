//Server Config Local

//Preloading the Environmental Variables

import "dotenv/config";

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";


import sessionMiddleware from "./src/session/session.config.js"
import router from "./src/routes/routes.js";
import errorMiddleware from "./src/middleware/error.js"

const PORT = process.env.PORT || 3000
const app = express()

//Parsing body of incoming request
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Allow rendering of dynamic pages
app.set('view engine', 'ejs');
app.set("views", "./src/views")

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 

app.use("/", express.static(path.join(__dirname, "public")))

app.post("/api", (req, res) => {

    const prompt = req.body.prompt;

    console.log(prompt); // check if it works

    res.json({ 
        message: "Received!",
        yourPrompt: prompt
    });
    
})


 app.use(sessionMiddleware)
app.use(router)
app.use(errorMiddleware) 


//redirect by status 404

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "public", "404.html"))}
)

app.use((req, res) => {

    res.status(500).sendFile(path.join(__dirname, "public", "500.html"))

})

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`)
})