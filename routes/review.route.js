import { Router } from 'express';
const router = Router();
import Review from '../models/review.model.js';
import User from '../models/user.model.js';
import Movie from '../models/movie.model.js';
import verifyToken from '../middlewares/auth.middleware.js';

router.post('/', verifyToken, async (req, res) => {
    try {
        const { description, rating, movieId } = req.body;
        const userId = req.userId;
        const user = await User.findById(userId);
        const movie = await Movie.findById(movieId);
        const review = new Review({ description, rating, movie, user });
        await review.save();
        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Review addition failed, ' + error.message });
    }
});

router.get('/movie/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const reviews = await Review.find({ movie: movieId });
        res.status(200).json({ message: reviews });
    } catch (error) {
        res.status(500).json({ error: 'Reviews retriving failed, ' + error.message });
    }
});

router.get('/my', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        const reviews = await Review.find({ user: userId });
        res.status(200).json({ message: reviews });
    } catch (error) {
        res.status(500).json({ error: 'Reviews retriving failed, ' + error.message });
    }
});

export default router;