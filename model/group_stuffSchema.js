const { required } = require('joi');
const { Schema, model } = require("mongoose")
const { Stuff } = require("./stuffSchema")
const { Group } = require("./groupSchema")

const group_stuffSchema = new Schema({
   stuff_id: { type: Schema.Types.ObjectId, ref: Stuff, default: null},
   group_id: { type: Schema.Types.ObjectId, ref: Group, default: null },
});

const Group_stuff = model("Group_stuff", group_stuffSchema);
module.exports = { Group_stuff };