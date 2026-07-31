import { JWT_SECRET, PORT } from './lib/env';
import express from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import authRoutes from './routes/auth';
import contestRoutes from './routes/contests';
import problemRoutes from './routes/problems';

export const app = express();
const port = PORT;

app.use(express.json());
const ALLOWED_ORIGINS = [
    'https://zafarr.xyz',
    'https://www.zafarr.xyz',
    'http://localhost:5173',
];

app.use((req, res, next) => {
    const origin = req.headers.origin ?? '';
    if (ALLOWED_ORIGINS.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

app.get('/api/health', (_, res) => {
    return res.status(200).json({
        success: true,
        data: {
            status: 'ok'
        },
        error: null
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/contests', contestRoutes);
app.use('/api/problems', problemRoutes);


const isMain = process.argv[1] !== undefined
    && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
    // Fail loudly rather than turning every authenticated request into a 401.
    if (!JWT_SECRET) {
        console.error('JWT_SECRET is not set. Add it to the repo root .env before starting the server.');
        process.exit(1);
    }

    app.listen(port, () => {
        console.log(`Listening to Aujla on port ${port}`);
    });
}
