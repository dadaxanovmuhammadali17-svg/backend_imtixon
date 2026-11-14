const { Role } = require("../model/roleSchema");


//--------------------Add Role---------------
const addRole = async(req, res) => {
   try{
      const {
         name,
      } = req.body;
      const newRole = new Role({
         name,
      });
      await newRole.save();
      res.status(201).json({ succes: true, message: "Role succesfully added", innder_data: newRole });
   }catch (err) {
      console.error(err.message);
      res.status(500).json({ succes: false, message: "Internal server error while adding role"});
   }
};
//--------------------Get Role--------------------------

const getRole = async (req,res)=>{
   try{
      const roles = await Role.find()
      if(!roles) {
         return res.status(404).json({ succes: false, message: "404 not found: Roles not found",});
      }
      res.status(200).json({succes: true, message: "All Roles fetched", innder_data: roles})
   } catch(err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error while fetching roles"})
   }
};

//---------------Get role by id-------------

const getRoleById = async (req, res) =>{
      try{
         const {id} = req.params;

         const roles = await Role.findById(id);
         if(!roles) {
            return res.status(404).json({success: false, message: "404 not found: Role not found"});
         } res.status(200).json({success: true, message: "role fetched", innder_data: roles});

        } catch (err) {
         console.error(err.message);
         res.status(500).json({ message: "Internal server error while fetching role"});
        }
};

//--------------------------Update Role----------------------


const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { name },
      { returnDocument: "after" }
    );

    if (!updatedRole) {
      return res.status(404).json({
        success: false,
        message: "Role not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      inner_data: updatedRole
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Internal server error while updating Role"
    });
  }
};

//-----------------Delete Role-------------------------

const deleteRole = async (req, res) => {
   try{
      const { id } = req.params;
      const deletedRole = await Role.findByIdAndDelete(id);
      if(deletedRole) {
         res.status(200).json({ success: true, message: "Role deleted succesfully" })
      } else {
         res.status(404).json({ success: false, message: "Role not found"})
      }
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error" });
   }
};

//---------------- search Role----------------
const searchRoles = async (req, res) => {
   try {
      const { query } = req.query;

      if (!query || typeof query != "string") {
         return res.status(400).json({ message: "Invalid search query" });
      }

      const result = await Role.find({
         $or: [
            { name: { $regex: query, $options: "i" } },
         ]
      });

      if (result.length === 0) {
         return res.json({ message: "Bunday Role topilmadi" });
      }
      res.json(result);
   } catch (err) {
      console.error("Error fetching Roles:", error);
      res.status(500).json({ message: "Server error: Failed to fetch Roles" });
   }
};

module.exports = {
   addRole,
   getRole,
   getRoleById,
   deleteRole,
   updateRole,
   searchRoles,
}