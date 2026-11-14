const { Student_Lesson } = require("../model/student_lessonSchema");

// -------------add Student_Lesson------------
const addStudent_lesson = async (req, res) => {
   try {
      const { lesson_id, student_id, is_there, reason, be_paid } = req.body;

      const newStudent_lesson = new Student_Lesson({
         lesson_id,
         student_id,
         is_there,
         reason,
         be_paid
      });

      await newStudent_lesson.save();
      res.status(201).json({ success: true, message: "Student_Lesson successfully added", data: newStudent_lesson });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error while adding Student_Lesson" });
   }
};

// -------------------Get Student_Lesson---------------
const getStudent_lesson = async (req, res) => {
   try {
      const student_lessons = await Student_Lesson.find().populate("lesson_id student_id");
      if (!student_lessons || student_lessons.length === 0) {
         return res.status(404).json({ success: false, message: "Student_Lesson not found" });
      }
      res.status(200).json({ success: true, message: "All student_lessons fetched", data: student_lessons });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error while fetching student_lesson" });
   }
};

// ----------------get Student_Lesson by ID -----------------------
const getStudentLessonById = async (req, res) => {
   try {
      const { id } = req.params;

      const student_lesson = await Student_Lesson.findById(id).populate("lesson_id student_id");
      if (!student_lesson) {
         return res.status(404).json({ success: false, message: "Student_Lesson not found" });
      }
      res.status(200).json({ success: true, message: "Student_Lesson fetched", data: student_lesson });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error while fetching student_lesson" });
   };
};

// --------------update Student_Lesson---------------
const updateStudentLesson = async (req, res) => {
   try {
      const { id } = req.params;
      const { lesson_id, student_id, is_there, reason, be_paid } = req.body;

      const updatedStudentLesson = await Student_Lesson.findByIdAndUpdate(
         id,
         { lesson_id, student_id, is_there, reason, be_paid },
         { new: true }
      ).populate("lesson_id student_id");

      if (!updatedStudentLesson) {
         return res.status(404).json({ success: false, message: "Student_Lesson not found" });
      }

      res.status(200).json({ success: true, message: "Student_Lesson updated successfully", data: updatedStudentLesson });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error while updating Student_Lesson" });
   }
};


// ------------delete Student_Lesson----------------
const deleteStudentLesson = async (req, res) => {
   try {
      const { id } = req.params;
      const deletedStudentLesson = await Student_Lesson.findByIdAndDelete(id);

      if (!deletedStudentLesson) {
         return res.status(404).json({ success: false, message: "Student_Lesson not found" });
      }

      res.status(200).json({ success: true, message: "Student_Lesson deleted successfully" });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error" });
   }
};

module.exports = {
   addStudent_lesson,
   getStudent_lesson,
   getStudentLessonById,
   updateStudentLesson,
   deleteStudentLesson
};