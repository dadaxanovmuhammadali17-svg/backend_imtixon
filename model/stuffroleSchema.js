const { required } = require('joi');
const { Schema, model } = require("mongoose")
const { Stuff } = require("./stuffSchema")
const { Role } = require("./roleSchema")

const stuffroleSchema = new Schema({
   stuff_id: { type: Schema.Types.ObjectId, ref: Stuff, default: null},
   role_id: { type: Schema.Types.ObjectId, ref: Role, default: null },
});

const Stuffrole = model("stuffrole", stuffroleSchema);
module.exports = { Stuffrole };