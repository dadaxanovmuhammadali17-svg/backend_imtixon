const { Stage } = require("../model/stageSchema");


//--------------------Add Stage---------------
const addStage = async(req, res) => {
   try{
      const {
         name,
      } = req.body;
      const newStage = new Stage({
         name,
      });
      await newStage.save();
      res.status(201).json({ succes: true, message: "Stage succesfully added", innder_data: newStage });
   }catch (err) {
      console.error(err.message);
      res.status(500).json({ succes: false, message: "Internal server error while adding Stage"});
   }
};
//--------------------Get Stage--------------------------

const getStage = async (req,res)=>{
   try{
      const stages = await Stage.find()
      if(!stages) {
         return res.status(404).json({ succes: false, message: "404 not found: Stages not found",});
      }
      res.status(200).json({succes: true, message: "All Stages fetched", innder_data: stages})
   } catch(err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error while fetching Stages"})
   }
};

//---------------Get Stage by id-------------

const getStageById = async (req, res) =>{
      try{
         const {id} = req.params;

         const stages = await Stage.findById(id);
         if(!stages) {
            return res.status(404).json({success: false, message: "404 not found: Stage not found"});
         } res.status(200).json({success: true, message: "Stage fetched", innder_data: stages});

        } catch (err) {
         console.error(err.message);
         res.status(500).json({ message: "Internal server error while fetching Stage"});
        }
};

//--------------------------Update Stage----------------------


const updateStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedStage = await Stage.findByIdAndUpdate(
      id,
      { name },
      { returnDocument: "after" }
    );

    if (!updatedStage) {
      return res.status(404).json({
        success: false,
        message: "Stage not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Stage updated successfully",
      inner_data: updatedStage
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Internal server error while updating Stage"
    });
  }
};

//-----------------Delete Stage-------------------------

const deleteStage = async (req, res) => {
   try{
      const { id } = req.params;
      const deletedStage = await Stage.findByIdAndDelete(id);
      if(deletedStage) {
         res.status(200).json({ success: true, message: "Stage deleted succesfully" })
      } else {
         res.status(404).json({ success: false, message: "Stage not found"})
      }
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error" });
   }
};

//---------------- search Stage----------------
const searchStages = async (req, res) => {
   try {
      const { query } = req.query;

      if (!query || typeof query != "string") {
         return res.status(400).json({ message: "Invalid search query" });
      }

      const result = await Stage.find({
         $or: [
            { name: { $regex: query, $options: "i" } },
         ]
      });

      if (result.length === 0) {
         return res.json({ message: "Bunday Stage topilmadi" });
      }
      res.json(result);
   } catch (err) {
      console.error("Error fetching Stages:", error);
      res.status(500).json({ message: "Server error: Failed to fetch Stages" });
   }
};

module.exports = {
   addStage,
   getStage,
   getStageById,
   deleteStage,
   updateStage,
   searchStages,
}