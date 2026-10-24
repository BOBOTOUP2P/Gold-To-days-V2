const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// ១. មាស (Gold - XAUT Bybit)
app.get('/api/gold', async (req, res) => {
    try {
        const response = await fetch('https://api.bybit.com/v5/market/tickers?category=linear&symbol=XAUTUSDT');
        const data = await response.json();
        res.json(data);
    } catch (e) { res.status(500).json({ error: 'Failed' }); }
});

// ២. ប្រាក់ (Silver - XAG)
app.get('/api/silver', async (req, res) => {
    try {
        const response = await fetch('https://api.gold-api.com/price/XAG');
        const data = await response.json();
        const p = data.price || 0;
        res.json({ result: { list: [{ lastPrice: p.toString(), highPrice24h: (p*1.015).toFixed(2), lowPrice24h: (p*0.985).toFixed(2) }] } });
    } catch (e) { res.status(500).json({ error: 'Failed' }); }
});

// ៣. ផ្លាទីន (Platinum - XPT)
app.get('/api/platinum', async (req, res) => {
    try {
        const response = await fetch('https://api.gold-api.com/price/XPT');
        const data = await response.json();
        const p = data.price || 0;
        res.json({ result: { list: [{ lastPrice: p.toString(), highPrice24h: (p*1.015).toFixed(2), lowPrice24h: (p*0.985).toFixed(2) }] } });
    } catch (e) { res.status(500).json({ error: 'Failed' }); }
});

// ៤. ស្ពាន់ (Copper - HG ផ្សារអន្តរជាតិ COMEX គិតជាផោន)
app.get('/api/copper', async (req, res) => {
    try {
        const response = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/HG=F');
        const data = await response.json();
        const meta = data.chart.result[0].meta;
        const p = meta.regularMarketPrice || 4.35;
        const h = meta.regularMarketDayHigh || p * 1.015;
        const l = meta.regularMarketDayLow || p * 0.985;
        res.json({ result: { list: [{ lastPrice: p.toString(), highPrice24h: h.toFixed(2), lowPrice24h: l.toFixed(2) }] } });
    } catch (e) {
        const p = 4.35;
        res.json({ result: { list: [{ lastPrice: p.toString(), highPrice24h: (p*1.015).toFixed(2), lowPrice24h: (p*0.985).toFixed(2) }] } });
    }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
