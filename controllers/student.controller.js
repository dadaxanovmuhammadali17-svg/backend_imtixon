const { Student } = require("../model/studentSchema");

//--------------------Add Student---------------
const addStudent = async (req, res) => {
   try {
      const {
         lid_id,
         first_name,
         last_name,
         phone_number,
         birthday,
         gender,
      } = req.body;

      const newStudent = new Student({
         lid_id,
         first_name,
         last_name,
         phone_number,
         birthday,
         gender,
      });

      await newStudent.save();
      res.status(201).json({ succes: true, message: "Student successfully added", innder_data: newStudent });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ succes: false, message: "Internal server error while adding Student" });
   }
};

//--------------------Get Students--------------------------
const getStudents = async (req, res) => {
   try {
      const students = await Student.find().populate("lid_id");
      if (!students) {
         return res.status(404).json({ succes: false, message: "404 not found: Students not found" });
      }
      res.status(200).json({ succes: true, message: "All Students fetched", innder_data: students });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error while fetching Students" });
   }
};

//---------------Get Student by id-------------
const getStudentById = async (req, res) => {
   try {
      const { id } = req.params;

      const student = await Student.findById(id).populate("lid_id");
      if (!student) {
         return res.status(404).json({ success: false, message: "404 not found: Student not found" });
      }
      res.status(200).json({ success: true, message: "Student fetched", innder_data: student });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error while fetching Student" });
   }
};

//--------------------------Update Student----------------------
const updateStudent = async (req, res) => {
   try {
      const { id } = req.params;
      const {
         lid_id,
         first_name,
         last_name,
         phone_number,
         birthday,
         gender,
      } = req.body;

      const updatedStudent = await Student.findByIdAndUpdate(
         id,
         {
            lid_id,
            first_name,
            last_name,
            phone_number,
            birthday,
            gender,
         },
         { returnDocument: "after" }
      );

      if (!updatedStudent) {
         return res.status(404).json({
            success: false,
            message: "Student not found",
         });
      }

      res.status(200).json({
         success: true,
         message: "Student updated successfully",
         inner_data: updatedStudent,
      });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({
         message: "Internal server error while updating Student",
      });
   }
};

//-----------------Delete Student-------------------------
const deleteStudent = async (req, res) => {
   try {
      const { id } = req.params;
      const deletedStudent = await Student.findByIdAndDelete(id);
      if (deletedStudent) {
         res.status(200).json({ success: true, message: "Student deleted successfully" });
      } else {
         res.status(404).json({ success: false, message: "Student not found" });
      }
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error" });
   }
};

//---------------- search Student ----------------
const searchStudent = async (req, res) => {
   try {
      const { query } = req.query;

      if (!query || typeof query != "string") {
         return res.status(400).json({ message: "Invalid search query" });
      }

      const result = await Student.find({
         $or: [
            { first_name: { $regex: query, $options: "i" } },
            { last_name: { $regex: query, $options: "i" } },
            { phone_number: { $regex: query, $options: "i" } },
         ],
      });

      if (result.length === 0) {
         return res.json({ message: "Bunday Student topilmadi" });
      }
      res.json(result);
   } catch (err) {
      console.error("Error fetching Students:", err);
      res.status(500).json({ message: "Server error: Failed to fetch Students" });
   }
};

module.exports = {
   addStudent,
   getStudents,
   getStudentById,
   updateStudent,
   deleteStudent,
   searchStudent,
};
