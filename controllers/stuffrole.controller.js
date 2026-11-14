const { Stuffrole } = require("../model/stuffroleSchema");

//---------------------Add Stuffrole----------------
const addStuffrole = async (req, res) => {
   try{
      const {
         stuff_id,
         role_id,
      } = req.body;
      const newStuffrole = new Stuffrole({
         stuff_id,
         role_id,
      });
      await newStuffrole.save();
      res.status(201).json({ succes: true, message: "Stuffrole successfully added", innder_data: newStuffrole});     
   }catch (err) {
      console.error(err.message);
      res.status(500).json({ succes: false, message: "Interval server error while adding Stuffrole", });
   }
};
// ----------------Get Stuffrole------------------------

const getStuffrole = async (req,res) =>{
   try{
      const stuffroles = await Stuffrole.find();
      if(!stuffroles) {
         return res.status(404).json({ succes: false, message: "404 not found: Stuffroles not found",});
      }
      res.status(200).json({succes: true, message: "All Stuffroles fetched", innder_data: stuffroles})
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error while fetching Stuffroles"});
   }
};

//--------------------------Get Stuffrole by id----------------------
const getStuffroleById = async (req, res) =>{
      try{
         const {id} = req.params;

         const stuffroles = await Stuffrole.findById(id).populate("stuff_id role_id");
         if(!stuffroles) {
            return res.status(404).json({success: false, message: "404 not found: Stuffrole not found"});
         } res.status(200).json({success: true, message: "Stuffrole fetched", innder_data: stuffroles});

        } catch (err) {
         console.error(err.message);
         res.status(500).json({ message: "Internal server error while fetching Stuffrole"});
        }
};

//--------------------------Update Stuffrole----------------------


const updateStuffrole = async (req, res) => {
  try {
    const { id } = req.params;
    const { stuff_id, role_id } = req.body;

    const updatedStuffrole = await Stuffrole.findByIdAndUpdate(
      id,
      { stuff_id, role_id },
      { returnDocument: "after" }
    );

    if (!updatedStuffrole) {
      return res.status(404).json({
        success: false,
        message: "Stuffrole not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Stuffrole updated successfully",
      inner_data: updatedStuffrole
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Internal server error while updating Stuffrole"
    });
  }
};

//-----------------Delete Stuffrole-------------------------

const deleteStuffrole = async (req, res) => {
   try{
      const { id } = req.params;
      const deletedStuffrole = await Stuffrole.findByIdAndDelete(id);
      if(deletedStuffrole) {
         res.status(200).json({ success: true, message: "Stuffrole deleted succesfully" })
      } else {
         res.status(404).json({ success: false, message: "Stuffrole not found"})
      }
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error" });
   }
};

module.exports = { addStuffrole, getStuffrole, getStuffroleById, updateStuffrole, deleteStuffrole};