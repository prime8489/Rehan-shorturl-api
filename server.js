const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// URL Shortening using TinyURL
app.post("/shorten", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
        res.json({ short_url: response.data });
    } catch (error) {
        res.status(500).json({ error: "Failed to shorten URL" });
    }
});

// Root Route
app.get("/", (req, res) => {
    res.send("Welcome to Rehan's Short URL API!");
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
