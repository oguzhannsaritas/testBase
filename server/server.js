import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001; // 5000 yerine 5001 kullan

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Node.js Backend Çalışıyor!');
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Preact + Vite + Playwright + Express!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server ${PORT} portunda çalışıyor...`);
});
