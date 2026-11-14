const { Group } = require("../model/groupSchema")

//---------------------Add Group-----------------
const addGroup = async (req, res) => {
   try {
      const {
         group_name,
         lesson_start_time,
         lesson_continuous,
         lesson_week_day,
         group_stage_idint,
         room_number,
         room_floor,
         branch_id,
         lessons_quant,
         is_active,
      } = req.body;

      const newGroup = new Group({
         group_name,
         lesson_start_time,
         lesson_continuous,
         lesson_week_day,
         group_stage_idint,
         room_number,
         room_floor,
         branch_id,
         lessons_quant,
         is_active,
      });

      await newGroup.save();

      res.status(201).json({
         success: true,
         message: "Group successfully added",
      });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({
         success: false,
         message: "Internal server error",
      });
   }
};

//---------------------Get all Groups-----------------
const getGroups = async (req, res) => {
   try {
      const groups = await Group.find();

      res.status(200).json({
         success: true,
         message: "All Groups fetched",
         innerData: groups,
      });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({
         success: false,
         message: "Internal server error",
      });
   }
};

//---------------------Get Group by ID-----------------
const getGroupById = async (req, res) => {
   try {
      const { id } = req.params;

      const group = await Group.findById(id).populate("group_stage_idint branch_id");

      if (!group) {
         return res.status(404).json({
            success: false,
            message: "Group not found",
         });
      }

      res.status(200).json({
         success: true,
         message: "Group fetched successfully",
         innerData: group,
      });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({
         success: false,
         message: "Internal server error",
      });
   }
};

//---------------------Update Group-----------------
const updateGroup = async (req, res) => {
   try {
      const { id } = req.params;

      const updatedGroup = await Group.findByIdAndUpdate(
         id,
         req.body,
         { new: true, runVaGroupators: true }
      );

      if (!updatedGroup) {
         return res.status(404).json({
            success: false,
            message: "Group not found",
         });
      }

      res.status(200).json({
         success: true,
         message: "Group successfully updated",
         data: updatedGroup,
      });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({
         success: false,
         message: "Internal server error",
      });
   }
};

//---------------------Delete Group-----------------
const deleteGroup = async (req, res) => {
   try {
      const { id } = req.params;

      const deletedGroup = await Group.findByIdAndDelete(id);

      if (!deletedGroup) {
         return res.status(404).json({
            success: false,
            message: "Group not found",
         });
      }

      res.status(200).json({
         success: true,
         message: "Group successfully deleted",
      });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({
         success: false,
         message: "Internal server error",
      });
   }
};
// -------------------------------search Group------------------------------


const searchGroup = async (req, res) => {
   try {
      const { search_query } = req.query;

      if (!search_query || typeof search_query !== "string") {
         return res.status(400).json({
            message: "InvaGroup search query"
         });
      }

      const result = await Group.find({
         $or: [
            { lesson_start_time: { $regex: search_query, $options: "i" } },
            { lesson_week_day: { $regex: search_query, $options: "i" } },
            { room_number: { $regex: search_query, $options: "i" } }
         ]
      });

      if (result.length === 0) {
         return res.status(404).json({
            message: "Bunday Group topilmadi"
         });
      }

      res.status(200).json({
         success: true,
         data: result
      });

   } catch (err) {
      console.error("Error fetching Group:", err);
      res.status(500).json({
         message: "Server error: Failed to fetch Group"
      });
   }
};


module.exports = {
   addGroup,
   getGroups,
   getGroupById,
   updateGroup,
   deleteGroup,
   searchGroup,
};