import { Router } from 'express';
const router = Router();
import User from '../models/user.model.js';
import Movie from '../models/movie.model.js';

router.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.render('index', {
            subject: 'MovieDB - HomePage',
            movies: movies
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

router.get('/movie/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        const user = await User.findById(movie.user);
        res.render('movie', {
            subject: 'MovieDB - ',
            movie: movie,
            user: user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

export default router;