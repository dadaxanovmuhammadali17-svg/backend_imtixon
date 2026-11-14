const { Lesson } = require("../model/lessonSchema");

//---------------------Add Lesson----------------
const addLesson = async (req, res) => {
   try {
      const {
         lesson_theme,
         lesson_number,
         group_id,
         lesson_date,
      } = req.body;
      const newLesson = new Lesson({
         lesson_theme,
         lesson_number,
         group_id,
         lesson_date,
      });
      await newLesson.save();
      res.status(201).json({ succes: true, message: "Lesson successfully added", innder_data: newLesson });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ succes: false, message: "Internal server error while adding Lesson" });
   }
};

// ----------------Get Lesson------------------------
const getLesson = async (req, res) => {
   try {
      const lessons = await Lesson.find().populate("group_id");
      if (!lessons) {
         return res.status(404).json({ succes: false, message: "404 not found: Lessons not found" });
      }
      res.status(200).json({ succes: true, message: "All Lessons fetched", innder_data: lessons });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error while fetching Lessons" });
   }
};

//--------------------------Get Lesson by id----------------------
const getLessonById = async (req, res) => {
   try {
      const { id } = req.params;

      const lesson = await Lesson.findById(id).populate("group_id");
      if (!lesson) {
         return res.status(404).json({ success: false, message: "404 not found: Lesson not found" });
      }
      res.status(200).json({ success: true, message: "Lesson fetched", innder_data: lesson });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error while fetching Lesson" });
   }
};

//--------------------------Update Lesson----------------------
const updateLesson = async (req, res) => {
   try {
      const { id } = req.params;
      const { lesson_theme, lesson_number, group_id, lesson_date } = req.body;

      const updatedLesson = await Lesson.findByIdAndUpdate(
         id,
         { lesson_theme, lesson_number, group_id, lesson_date },
         { returnDocument: "after" }
      );

      if (!updatedLesson) {
         return res.status(404).json({
            success: false,
            message: "Lesson not found"
         });
      }

      res.status(200).json({
         success: true,
         message: "Lesson updated successfully",
         inner_data: updatedLesson
      });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({
         message: "Internal server error while updating Lesson"
      });
   }
};

//-----------------Delete Lesson-------------------------
const deleteLesson = async (req, res) => {
   try {
      const { id } = req.params;
      const deletedLesson = await Lesson.findByIdAndDelete(id);
      if (deletedLesson) {
         res.status(200).json({ success: true, message: "Lesson deleted succesfully" });
      } else {
         res.status(404).json({ success: false, message: "Lesson not found" });
      }
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error" });
   }
};

//---------------- search Lesson----------------
const searchLesson = async (req, res) => {
   try {
      const { query } = req.query;

      if (!query || typeof query != "string") {
         return res.status(400).json({ message: "Invalid search query" });
      }

      const result = await Lesson.find({
         $or: [
            { lesson_theme: { $regex: query, $options: "i" } },
         ]
      });

      if (result.length === 0) {
         return res.json({ message: "Bunday Lesson topilmadi" });
      }
      res.json(result);
   } catch (err) {
      console.error("Error fetching Lessons:", err);
      res.status(500).json({ message: "Server error: Failed to fetch Lessons" });
   }
};

module.exports = {
   addLesson,
   getLesson,
   getLessonById,
   updateLesson,
   deleteLesson,
   searchLesson,
};
