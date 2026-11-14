const { Schema, model } = require("mongoose");
const { Stage } = require("./stageSchema");
const { Group } = require("./groupSchema");
const { Lid_status } = require("./lid_statusSchema");
const { Reason_lid } = require("./reason_lidSchema");

const lidSchema = new Schema({
   first_name: { type: String },
   last_name: { type: String },
   phone_number: { type: String },
   lid_stage_id: { type: Schema.Types.ObjectId, ref: Stage, default: null },
   test_date: { type: Date },
   trial_lesson_date: { type: Number },
   trial_lesson_time: { type: String },
   trial_lesson_group_id: { type: Schema.Types.ObjectId, ref: Group, default: null },
   lid_status_id: { type: Schema.Types.ObjectId, ref: Lid_status, default: null },
   cancel_reson_id: { type: Schema.Types.ObjectId, ref: Reason_lid, default: null },
});

const Lid = model("Lid", lidSchema);
module.exports = { Lid };