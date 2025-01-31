import express, { json } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const app = express();

import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';
import reviewRoutes from './routes/review.route.js';
import friendshipRoutes from './routes/friendship.route.js';
import pagesRoutes from './routes/pages.route.js';
import adminRoutes from './routes/admin.route.js';

const DATABASE_URL = "mongodb://127.0.0.1/movie_review";
const PORT = 5000;
const JWT_SECRET = "6ae9271457780916410ef74855f7e2299364ef006eb8e6bc2cf6bc821483ed1d";

const db = mongoose.connection;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(json());

app.use('/auth', authRoutes);
app.use('/movie', movieRoutes);
app.use('/review', reviewRoutes);
app.use('/friendship', friendshipRoutes);
app.use('/pages', pagesRoutes);
app.use('/public', express.static('public'));
app.use('/admin', adminRoutes);

mongoose.connect(DATABASE_URL);
mongoose.set('strictQuery', true);
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default JWT_SECRET;