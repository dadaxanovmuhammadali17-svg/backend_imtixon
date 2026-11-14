const { Reason_lid } = require("../model/reason_lidSchema");

//--------------------Add Reason_lid---------------
const addReason_lid = async (req, res) => {
   try {
      const {
         reason_lid,
      } = req.body;
      const newReason_lid = new Reason_lid({
         reason_lid,
      });
      await newReason_lid.save();
      res.status(201).json({ succes: true, message: "Reason_lid succesfully added", innder_data: newReason_lid });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ succes: false, message: "Internal server error while adding Reason_lid" });
   }
};

//--------------------Get Reason_lid--------------------------
const getReason_lid = async (req, res) => {
   try {
      const reason_lids = await Reason_lid.find();
      if (!reason_lids) {
         return res.status(404).json({ succes: false, message: "404 not found: Reason_lids not found" });
      }
      res.status(200).json({ succes: true, message: "All Reason_lids fetched", innder_data: reason_lids });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error while fetching Reason_lids" });
   }
};

//---------------Get Reason_lid by id-------------
const getReason_lidById = async (req, res) => {
   try {
      const { id } = req.params;

      const reason_lid = await Reason_lid.findById(id);
      if (!reason_lid) {
         return res.status(404).json({ success: false, message: "404 not found: Reason_lid not found" });
      }
      res.status(200).json({ success: true, message: "Reason_lid fetched", innder_data: reason_lid });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error while fetching Reason_lid" });
   }
};

//--------------------------Update Reason_lid----------------------
const updateReason_lid = async (req, res) => {
   try {
      const { id } = req.params;
      const { reason_lid } = req.body;

      const updatedReason_lid = await Reason_lid.findByIdAndUpdate(
         id,
         { reason_lid },
         { returnDocument: "after" }
      );

      if (!updatedReason_lid) {
         return res.status(404).json({
            success: false,
            message: "Reason_lid not found"
         });
      }

      res.status(200).json({
         success: true,
         message: "Reason_lid updated successfully",
         inner_data: updatedReason_lid
      });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({
         message: "Internal server error while updating Reason_lid"
      });
   }
};

//-----------------Delete Reason_lid-------------------------
const deleteReason_lid = async (req, res) => {
   try {
      const { id } = req.params;
      const deletedReason_lid = await Reason_lid.findByIdAndDelete(id);
      if (deletedReason_lid) {
         res.status(200).json({ success: true, message: "Reason_lid deleted succesfully" });
      } else {
         res.status(404).json({ success: false, message: "Reason_lid not found" });
      }
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error" });
   }
};

//---------------- search Reason_lid----------------
const searchReason_lid = async (req, res) => {
   try {
      const { query } = req.query;

      if (!query || typeof query != "string") {
         return res.status(400).json({ message: "Invalid search query" });
      }

      const result = await Reason_lid.find({
         $or: [
            { reason_lid: { $regex: query, $options: "i" } },
         ]
      });

      if (result.length === 0) {
         return res.json({ message: "Bunday Reason_lid topilmadi" });
      }
      res.json(result);
   } catch (err) {
      console.error("Error fetching Reason_lids:", err);
      res.status(500).json({ message: "Server error: Failed to fetch Reason_lids" });
   }
};

module.exports = {
   addReason_lid,
   getReason_lid,
   getReason_lidById,
   updateReason_lid,
   deleteReason_lid,
   searchReason_lid,
};
