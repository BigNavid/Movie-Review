// models/review.model.js
import { Schema, model } from 'mongoose';
const reviewSchema = new Schema({
    description: {
        type: String,
        max: 2048
    },
    rating: {
        type: Number
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pendding', 'approved', 'declined'],
        default: 'pendding'
    }
});

export default model('Review', reviewSchema);