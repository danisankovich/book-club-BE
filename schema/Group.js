const mongoose = require("mongoose"); // Import mongoose library
const Schema = mongoose.Schema // Define Schema method

// Schema
var GroupsSchema = new Schema({ // Create Schema
    name: String,
    groupId: String,
})

// Model
var Groups = mongoose.model("Groups", GroupsSchema) // Create collection model from schema
module.exports = Groups; // export model