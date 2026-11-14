const { Group_stuff } = require("../model/group_stuffSchema");

//---------------------Add Group_stuff----------------
const addGroup_stuff = async (req, res) => {
   try{
      const {
         stuff_id,
         group_id,
      } = req.body;
      const newGroup_stuff = new Group_stuff({
         stuff_id,
         group_id,
      });
      await newGroup_stuff.save();
      res.status(201).json({ succes: true, message: "Group_stuff successfully added", innder_data: newGroup_stuff});     
   }catch (err) {
      console.error(err.message);
      res.status(500).json({ succes: false, message: "Interval server error while adding Group_stuff", });
   }
};
// ----------------Get Group_stuff------------------------

const getGroup_stuff = async (req,res) =>{
   try{
      const group_stuffs = await Group_stuff.find();
      if(!group_stuffs) {
         return res.status(404).json({ succes: false, message: "404 not found: Group_stuffs not found",});
      }
      res.status(200).json({succes: true, message: "All Group_stuffs fetched", innder_data: group_stuffs})
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error while fetching Group_stuffs"});
   }
};

//--------------------------Get Group_stuff by id----------------------
const getGroup_stuffById = async (req, res) =>{
      try{
         const {id} = req.params;

         const group_stuffs = await Group_stuff.findById(id).populate("stuff_id group_id");
         if(!group_stuffs) {
            return res.status(404).json({success: false, message: "404 not found: Group_stuff not found"});
         } res.status(200).json({success: true, message: "Group_stuff fetched", innder_data: group_stuffs});
        } catch (err) {
         console.error(err.message);
         res.status(500).json({ message: "Internal server error while fetching Group_stuff"});
        }
};

//--------------------------Update Group_stuff----------------------


const updateGroup_stuff = async (req, res) => {
  try {
    const { id } = req.params;
    const { stuff_id, group_id } = req.body;

    const updatedGroup_stuff = await Group_stuff.findByIdAndUpdate(
      id,
      { stuff_id, group_id },
      { returnDocument: "after" }
    );

    if (!updatedGroup_stuff) {
      return res.status(404).json({
        success: false,
        message: "Group_stuff not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Group_stuff updated successfully",
      inner_data: updatedGroup_stuff
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Internal server error while updating Group_stuff"
    });
  }
};

//-----------------Delete Group_stuff-------------------------

const deleteGroup_stuff = async (req, res) => {
   try{
      const { id } = req.params;
      const deletedGroup_stuff = await Group_stuff.findByIdAndDelete(id);
      if(deletedGroup_stuff) {
         res.status(200).json({ success: true, message: "Group_stuff deleted succesfully" })
      } else {
         res.status(404).json({ success: false, message: "Group_stuff not found"})
      }
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error" });
   }
};

module.exports = { addGroup_stuff, getGroup_stuff, getGroup_stuffById, updateGroup_stuff, deleteGroup_stuff};