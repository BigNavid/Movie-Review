import { Router } from 'express';
const router = Router();
import Movie from '../models/movie.model.js';
import User from '../models/user.model.js';
import verifyToken from '../middlewares/auth.middleware.js';

router.post('/', verifyToken, async (req, res) => {
    try {
        const { name, description, image, genre, release_year, users_rating } = req.body;
        if (!name) {
            throw { message: "Name cannot be empty!" };
        }
        const userId = req.userId
        const user = await User.findById(userId);
        const movie = new Movie({ name, description, image, genre, release_year, users_rating, user });
        await movie.save();
        res.status(201).json({ message: 'Movie added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Movie addition failed, ' + error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const genre = req.query.genre;
        const releaseYearMax = req.query.releaseYearMax;
        const rateMax = req.query.rateMax;
        const releaseYearMin = req.query.releaseYearMin;
        const rateMin = req.query.rateMin;

        var filter = {};
        if(genre){
            filter.genre = genre;
        }
        if(releaseYearMin || releaseYearMax){
            filter.release_year = {};
        }
        if(releaseYearMin){
            filter.release_year.$gte = releaseYearMin;
        }
        if(releaseYearMax){
            filter.release_year.$lte = releaseYearMax;
        }
        if(rateMin || rateMax){
            filter.users_rating = {};
        }
        if(rateMin){
            filter.users_rating.$gte = rateMin;
        }
        if(rateMax){
            filter.users_rating.$lte = rateMax;
        }

        console.log(filter);

        // const filter = { release_year: { $gte: releaseYearMin, $lte: releaseYearMax }, users_rating: { $gte: rateMin, $lte: rateMax } };
        
        const movies = await Movie.find(filter);
        res.status(200).json({ message: movies });
    } catch (error) {
        res.status(500).json({ error: 'Movies retriving failed, ' + error.message });
    }
});

router.get('/my', verifyToken, async (req, res) => {
    try {
        const id = req.userId
        const movies = await Movie.find({ user: id });
        res.status(200).json({ message: movies });
    } catch (error) {
        res.status(500).json({ error: 'Movies retriving failed, ' + error.message });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    try {
        const movieId = req.params.id;
        const { name, description, image } = req.body;
        if (!req.body.name) {
            throw { message: "Name cannot be empty!" };
        }
        const userId = req.userId
        const filter = { _id: movieId, user: userId };
        const update = { name, description, image };
        const movie = await Movie.findOneAndUpdate(filter, update);
        if (!movie) {
            throw { message: "This movie is not yours or doesen't exist!" };
        }
        await movie.save();
        res.status(201).json({ message: 'Movie edited successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Movie edition failed, ' + error.message });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const movieId = req.params.id;
        const userId = req.userId
        const filter = { _id: movieId, user: userId };
        const movie = await Movie.findByIdAndDelete(filter);
        if (!movie) {
            throw { message: "This movie is not yours or doesen't exist!" };
        }
        res.status(201).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Movie deletions failed, ' + error.message });
    }
});

export default router;