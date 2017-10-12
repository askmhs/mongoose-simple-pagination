import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const student = new Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    classroom: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('Student', student);