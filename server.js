const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// API តម្លៃមាស (Gold - XAUT)
app.get('/api/gold', async (req, res) => {
    try {
        const response = await fetch('https://api.bybit.com/v5/market/tickers?category=linear&symbol=XAUTUSDT');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Gold' });
    }
});

// API តម្លៃប្រាក់ (Silver - XAG)
app.get('/api/silver', async (req, res) => {
    try {
        const response = await fetch('https://api.gold-api.com/price/XAG');
        const data = await response.json();
        const price = data.price || 0;
        // រៀបចំទម្រង់ទិន្នន័យឱ្យដូច Bybit ងាយស្រួលបង្ហាញ
        res.json({
            result: {
                list: [{
                    lastPrice: price.toString(),
                    highPrice24h: (price * 1.015).toFixed(2),
                    lowPrice24h: (price * 0.985).toFixed(2)
                }]
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Silver' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
