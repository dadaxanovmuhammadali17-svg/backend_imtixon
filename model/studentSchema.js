const { Schema, model } = require("mongoose");
const { Lid } = require("./lidSchema");


const studentSchema = new Schema({
   lid_id: { type: Schema.Types.ObjectId, ref: Lid, default: null },   
   first_name: { type: String },
   last_name: { type: String },
   phone_number: { type: String },
   birthday: { type: Date },
   gender: { type: String, enum: ["male","female"], alias: "jinsi" },
});

const Student = model("Student", studentSchema);
module.exports = { Student };