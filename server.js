const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// ១. មាស (Gold Bybit)
app.get('/api/gold', async (req, res) => {
    try {
        const response = await fetch('https://api.bybit.com/v5/market/tickers?category=linear&symbol=XAUTUSDT');
        res.json(await response.json());
    } catch (e) { res.status(500).json({ error: 'Failed' }); }
});

// ២. ប្រាក់ (Silver)
app.get('/api/silver', async (req, res) => {
    try {
        const data = await (await fetch('https://api.gold-api.com/price/XAG')).json();
        const p = data.price || 0;
        res.json({ result: { list: [{ lastPrice: p.toString(), highPrice24h: (p*1.015).toFixed(2), lowPrice24h: (p*0.985).toFixed(2) }] } });
    } catch (e) { res.status(500).json({ error: 'Failed' }); }
});

// ៣. ផ្លាទីន (Platinum)
app.get('/api/platinum', async (req, res) => {
    try {
        const data = await (await fetch('https://api.gold-api.com/price/XPT')).json();
        const p = data.price || 0;
        res.json({ result: { list: [{ lastPrice: p.toString(), highPrice24h: (p*1.015).toFixed(2), lowPrice24h: (p*0.985).toFixed(2) }] } });
    } catch (e) { res.status(500).json({ error: 'Failed' }); }
});

// ៤. ស្ពាន់ (Copper)
app.get('/api/copper', async (req, res) => {
    try {
        const data = await (await fetch('https://query1.finance.yahoo.com/v8/finance/chart/HG=F')).json();
        const meta = data.chart.result[0].meta;
        const p = meta.regularMarketPrice || 4.35;
        res.json({ result: { list: [{ lastPrice: p.toString(), highPrice24h: (meta.regularMarketDayHigh || p*1.015).toFixed(2), lowPrice24h: (meta.regularMarketDayLow || p*0.985).toFixed(2) }] } });
    } catch (e) { res.json({ result: { list: [{ lastPrice: "4.35", highPrice24h: "4.41", lowPrice24h: "4.28" }] } }); }
});

// ៥. ប្រេងសាំង (Gasoline)
app.get('/api/gasoline', async (req, res) => {
    try {
        const data = await (await fetch('https://query1.finance.yahoo.com/v8/finance/chart/RB=F')).json();
        const meta = data.chart.result[0].meta;
        const p = meta.regularMarketPrice || 2.15;
        res.json({ result: { list: [{ lastPrice: p.toString(), highPrice24h: (meta.regularMarketDayHigh || p*1.015).toFixed(3), lowPrice24h: (meta.regularMarketDayLow || p*0.985).toFixed(3) }] } });
    } catch (e) { res.json({ result: { list: [{ lastPrice: "2.15", highPrice24h: "2.18", lowPrice24h: "2.11" }] } }); }
});

// ៦. ម៉ាស៊ូត (Diesel)
app.get('/api/diesel', async (req, res) => {
    try {
        const data = await (await fetch('https://query1.finance.yahoo.com/v8/finance/chart/HO=F')).json();
        const meta = data.chart.result[0].meta;
        const p = meta.regularMarketPrice || 2.30;
        res.json({ result: { list: [{ lastPrice: p.toString(), highPrice24h: (meta.regularMarketDayHigh || p*1.015).toFixed(3), lowPrice24h: (meta.regularMarketDayLow || p*0.985).toFixed(3) }] } });
    } catch (e) { res.json({ result: { list: [{ lastPrice: "2.30", highPrice24h: "2.34", lowPrice24h: "2.26" }] } }); }
});

// ៧. ហ្គាស (Natural Gas)
app.get('/api/gas', async (req, res) => {
    try {
        const data = await (await fetch('https://query1.finance.yahoo.com/v8/finance/chart/NG=F')).json();
        const meta = data.chart.result[0].meta;
        const p = meta.regularMarketPrice || 3.20;
        res.json({ result: { list: [{ lastPrice: p.toString(), highPrice24h: (meta.regularMarketDayHigh || p*1.02).toFixed(3), lowPrice24h: (meta.regularMarketDayLow || p*0.98).toFixed(3) }] } });
    } catch (e) { res.json({ result: { list: [{ lastPrice: "3.20", highPrice24h: "3.26", lowPrice24h: "3.14" }] } }); }
});

// ៨. ហាងឆេងលុយ (Forex: USD, KHR, CNY, KRW, JPY)
app.get('/api/forex', async (req, res) => {
    try {
        const data = await (await fetch('https://open.er-api.com/v6/latest/USD')).json();
        res.json({ result: { khr: data.rates.KHR || 4085, cny: data.rates.CNY || 7.25, krw: data.rates.KRW || 1445, jpy: data.rates.JPY || 153.8 } });
    } catch (e) { res.json({ result: { khr: 4085, cny: 7.25, krw: 1445, jpy: 153.8 } }); }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
