const { Lid } = require("../model/lidSchema");

//--------------------Add Lid---------------
const addLid = async (req, res) => {
   try {
      const {
         first_name,
         last_name,
         phone_number,
         lid_stage_id,
         test_date,
         trial_lesson_date,
         trial_lesson_time,
         trial_lesson_group_id,
         lid_status_id,
         cancel_reson_id,
      } = req.body;

      const newLid = new Lid({
         first_name,
         last_name,
         phone_number,
         lid_stage_id,
         test_date,
         trial_lesson_date,
         trial_lesson_time,
         trial_lesson_group_id,
         lid_status_id,
         cancel_reson_id,
      });

      await newLid.save();
      res.status(201).json({ succes: true, message: "Lid successfully added", innder_data: newLid });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ succes: false, message: "Internal server error while adding Lid" });
   }
};

//--------------------Get Lid--------------------------
const getLid = async (req, res) => {
   try {
      const lids = await Lid.find()
         .populate("lid_stage_id")
         .populate("trial_lesson_group_id")
         .populate("lid_status_id")
         .populate("cancel_reson_id");

      if (!lids) {
         return res.status(404).json({ succes: false, message: "404 not found: Lids not found" });
      }
      res.status(200).json({ succes: true, message: "All Lids fetched", innder_data: lids });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error while fetching Lids" });
   }
};

//---------------Get Lid by id-------------
const getLidById = async (req, res) => {
   try {
      const { id } = req.params;

      const lid = await Lid.findById(id)
         .populate("lid_stage_id")
         .populate("trial_lesson_group_id")
         .populate("lid_status_id")
         .populate("cancel_reson_id");

      if (!lid) {
         return res.status(404).json({ success: false, message: "404 not found: Lid not found" });
      }
      res.status(200).json({ success: true, message: "Lid fetched", innder_data: lid });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error while fetching Lid" });
   }
};

//--------------------------Update Lid----------------------
const updateLid = async (req, res) => {
   try {
      const { id } = req.params;
      const {
         first_name,
         last_name,
         phone_number,
         lid_stage_id,
         test_date,
         trial_lesson_date,
         trial_lesson_time,
         trial_lesson_group_id,
         lid_status_id,
         cancel_reson_id,
      } = req.body;

      const updatedLid = await Lid.findByIdAndUpdate(
         id,
         {
            first_name,
            last_name,
            phone_number,
            lid_stage_id,
            test_date,
            trial_lesson_date,
            trial_lesson_time,
            trial_lesson_group_id,
            lid_status_id,
            cancel_reson_id,
         },
         { returnDocument: "after" }
      );

      if (!updatedLid) {
         return res.status(404).json({
            success: false,
            message: "Lid not found",
         });
      }

      res.status(200).json({
         success: true,
         message: "Lid updated successfully",
         inner_data: updatedLid,
      });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({
         message: "Internal server error while updating Lid",
      });
   }
};

//-----------------Delete Lid-------------------------
const deleteLid = async (req, res) => {
   try {
      const { id } = req.params;
      const deletedLid = await Lid.findByIdAndDelete(id);
      if (deletedLid) {
         res.status(200).json({ success: true, message: "Lid deleted successfully" });
      } else {
         res.status(404).json({ success: false, message: "Lid not found" });
      }
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error" });
   }
};

//---------------- search Lid ----------------
const searchLid = async (req, res) => {
   try {
      const { query } = req.query;

      if (!query || typeof query != "string") {
         return res.status(400).json({ message: "Invalid search query" });
      }

      const result = await Lid.find({
         $or: [
            { first_name: { $regex: query, $options: "i" } },
            { last_name: { $regex: query, $options: "i" } },
            { phone_number: { $regex: query, $options: "i" } },
         ],
      });

      if (result.length === 0) {
         return res.json({ message: "Bunday Lid topilmadi" });
      }
      res.json(result);
   } catch (err) {
      console.error("Error fetching Lids:", err);
      res.status(500).json({ message: "Server error: Failed to fetch Lids" });
   }
};

module.exports = {
   addLid,
   getLid,
   getLidById,
   updateLid,
   deleteLid,
   searchLid,
};
