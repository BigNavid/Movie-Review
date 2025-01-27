// models/movie.model.js
import { Schema, model } from 'mongoose';
const movieSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    description: {
        type: String,
        max: 2048
    },
    image: {
        type: Buffer
    },
    genre: {
        type: String,
        enum: ['ACTION', 'ADVENTURE', 'ANIMATION', 'COMEDY', 'DRAMA', 'HORROR', 'SCIFI', 'THRILLER', 'ROMANCE']
    },
    release_year: {
        type: Number,
        required: true
    },
    users_rating: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default model('Movie', movieSchema);