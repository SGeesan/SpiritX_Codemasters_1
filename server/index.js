import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import DB from './db.js'
import cookieParser from 'cookie-parser';
import users from './routes/user.route.js';

const port = process.env.PORT || 5000;

const app = express();
app.use(cors(
    {
        origin: process.env.ORIGIN_URL || 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    }
));
app.use(express.json());
app.use(cookieParser());
dotenv.config();


app.use('/api/users', users);


app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
