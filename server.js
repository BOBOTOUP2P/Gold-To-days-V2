const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// បើកបង្ហាញទំព័រ HTML ពី Folder "public"
app.use(express.static(path.join(__dirname, 'public')));

// API ស្ពានកណ្តាលទាញតម្លៃពី Bybit
app.get('/api/gold', async (req, res) => {
    try {
        const response = await fetch('https://api.bybit.com/v5/market/tickers?category=linear&symbol=XAUTUSDT');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch from Bybit' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
