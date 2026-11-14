const { Schema, model} = require("mongoose");

const reason_lidSchema = new Schema({
   reason_lid: {type: String, required:true}
})

const Reason_lid = model("Reason_lid", reason_lidSchema);
module.exports = { Reason_lid }