const mongoose = require("mongoose"); // Import mongoose library
const Schema = mongoose.Schema // Define Schema method

// Schema
var PitchesSchema = new Schema({ // Create Schema
    title: String,
    authors: String,
    description: String,
    thumbnail: String,
    user: String,
    meetingId: String,
    votes: Number
})

// Model
var Pitches = mongoose.model("Pitches", PitchesSchema) // Create collection model from schema
module.exports = Pitches // export model