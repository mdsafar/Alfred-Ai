import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    chats: [
        {
            role: {
                type: String,
                enum: ['user', 'model'],
                required: true
            },
            parts: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },

})

const Chats = mongoose.model('Chats', chatSchema)

export default Chats