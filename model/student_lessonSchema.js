const { Schema, model } = require("mongoose");
const { Student } = require("./studentSchema");
const { Lesson } = require("./lessonSchema");



const student_lessonSchema = new Schema({
   lesson_id: { type: Schema.Types.ObjectId, ref: Lesson, default: null },
   student_id: { type: Schema.Types.ObjectId, ref: Student, default: null },
   is_there: { type: Boolean },
   reason: { type: String },
   be_paid: { type: Boolean },
});

const Student_lessonSchema = model("Student_lessonSchema", student_lessonSchema);
module.exports = { Student_lessonSchema };