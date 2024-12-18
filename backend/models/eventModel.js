import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true, 
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true, 
        },
        eventDate: {
            type: Date,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        organizer: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: false,
        },
        available: {
            type: Number,
            required: false,
        },
        image: {
            type: String,
            required: true,
        }
    },
    { 
        timestamps: true 
    }
);

const Event = mongoose.model("events", eventSchema);

export default Event;