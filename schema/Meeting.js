const mongoose = require("mongoose"); // Import mongoose library
const Schema = mongoose.Schema // Define Schema method

// Schema
var MeetingsSchema = new Schema({ // Create Schema
    meetingDate: String,
    meetingId: String,
    isVisibleToUsers: Boolean,
    pitches: [],
    votes: {}
})

// Model
var Meetings = mongoose.model("Meetings", MeetingsSchema) // Create collection model from schema
module.exports = Meetings // export model