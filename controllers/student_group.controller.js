const { Student_group } = require("../model/student_groupSchema");

//--------------------Add Student_group---------------
const addStudent_group = async (req, res) => {
   try {
      const { student_id, group_id } = req.body;

      const newStudent_group = new Student_group({
         student_id,
         group_id,
      });

      await newStudent_group.save();
      res.status(201).json({ succes: true, message: "Student_group successfully added", innder_data: newStudent_group });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ succes: false, message: "Internal server error while adding Student_group" });
   }
};

//--------------------Get Student_groups--------------------------
const getStudent_groups = async (req, res) => {
   try {
      const student_groups = await Student_group.find()
         .populate("student_id")
         .populate("group_id");

      if (!student_groups) {
         return res.status(404).json({ succes: false, message: "404 not found: Student_groups not found" });
      }
      res.status(200).json({ succes: true, message: "All Student_groups fetched", innder_data: student_groups });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error while fetching Student_groups" });
   }
};

//---------------Get Student_group by id-------------
const getStudent_groupById = async (req, res) => {
   try {
      const { id } = req.params;

      const student_group = await Student_group.findById(id)
         .populate("student_id")
         .populate("group_id");

      if (!student_group) {
         return res.status(404).json({ success: false, message: "404 not found: Student_group not found" });
      }
      res.status(200).json({ success: true, message: "Student_group fetched", innder_data: student_group });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error while fetching Student_group" });
   }
};

//--------------------------Update Student_group----------------------
const updateStudent_group = async (req, res) => {
   try {
      const { id } = req.params;
      const { student_id, group_id } = req.body;

      const updatedStudent_group = await Student_group.findByIdAndUpdate(
         id,
         { student_id, group_id },
         { returnDocument: "after" }
      );

      if (!updatedStudent_group) {
         return res.status(404).json({
            success: false,
            message: "Student_group not found",
         });
      }

      res.status(200).json({
         success: true,
         message: "Student_group updated successfully",
         inner_data: updatedStudent_group,
      });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({
         message: "Internal server error while updating Student_group",
      });
   }
};

//-----------------Delete Student_group-------------------------
const deleteStudent_group = async (req, res) => {
   try {
      const { id } = req.params;
      const deletedStudent_group = await Student_group.findByIdAndDelete(id);
      if (deletedStudent_group) {
         res.status(200).json({ success: true, message: "Student_group deleted successfully" });
      } else {
         res.status(404).json({ success: false, message: "Student_group not found" });
      }
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error" });
   }
};

module.exports = {
   addStudent_group,
   getStudent_groups,
   getStudent_groupById,
   updateStudent_group,
   deleteStudent_group,
};
