const { required } = require('joi');
const { Schema, model } = require("mongoose")
const { Group } = require("./groupSchema")

const lessonSchema = new Schema({
   lesson_theme: { type: String },
   lesson_number: { type: Number },
   group_id: { type: Schema.Types.ObjectId, ref: Group, default: null },
   lesson_date: { type: Date },
});

const Lesson = model("Lesson", lessonSchema);
module.exports = { Lesson };