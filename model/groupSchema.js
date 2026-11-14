const { Schema, model } = require("mongoose");
const { Stage } = require("./stageSchema");
const { Branch } = require("./branchSchema");

const groupSchema = new Schema({
   group_name: { type: String },
   lesson_start_time: { type: String },
   lesson_continuous: { type: String },
   lesson_week_day: { type: String },
   group_stage_idint: { type: Schema.Types.ObjectId, ref: Stage, default: null },
   room_number: { type: String },
   room_floor: { type: Number },
   branch_id: { type: Schema.Types.ObjectId, ref: Branch, default: null },
   lessons_quant: { type: Number },
   is_active: { type: Boolean },
});

const Group = model("Group", groupSchema);
module.exports = { Group };