const { Schema, model} = require("mongoose");

const lid_statusSchema = new Schema({
   name: {type: String, required:true}
})

const Lid_status = model("Lid_status", lid_statusSchema);
module.exports = { Lid_status }