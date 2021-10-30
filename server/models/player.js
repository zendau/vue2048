const mongoose = require("mongoose")
const { Schema, model } = mongoose

const playersSchema = new Schema({
    username: {type: String, required: true},
    score:  {type: String, required: true},
})

module.exports = model("Players", playersSchema)