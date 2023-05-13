import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { rateLimit } from "express-rate-limit";

const app = express();

const limiter = rateLimit({
    windowMs: 1000,
    max: 1
})

app.use(cors());
app.use(express.json());
app.use(limiter);

app.get("/api/data/:city", async (req, res) => {
    try {
        const { city } = req.params;
        const url = "https://api.openweathermap.org/data/2.5/weather";
    
        const response = await fetch(`${url}/?q=${city}&units=metric&appid=${process.env.API_KEY}`);
        const data = await response.json();
    
        res.json(data);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
