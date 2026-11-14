const { required } = require('joi');
const { Schema, model } = require("mongoose")
const { Student } = require("./studentSchema")
const { Group } = require("./groupSchema")

const student_groupSchema = new Schema({
   student_id: { type: Schema.Types.ObjectId, ref: Student, default: null},
   group_id: { type: Schema.Types.ObjectId, ref: Group, default: null },
});

const Student_group = model("student_group", student_groupSchema);
module.exports = { Student_group };