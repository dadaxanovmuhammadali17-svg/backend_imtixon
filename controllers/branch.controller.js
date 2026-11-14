const { Branch } = require("../model/branchSchema");

//---------------------Add Branch----------------
const addBranch = async (req, res) => {
   try {
      const {
         name,
         address,
         call_number,
      } = req.body;
      const newBranch = new Branch({
         name,
         address,
         call_number,
      });
      await newBranch.save();
      res.status(201).json({ succes: true, message: "Branch successfully added", innder_data: newBranch })
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ succes: false, message: "Interval server error while adding Branch", });
   }
};
// ----------------Get Branch------------------------

const getBranch = async (req, res) => {
   try {
      const branchs = await Branch.find();
      if (!branchs) {
         return res.status(404).json({ succes: false, message: "404 not found: Branch not found", });
      }
      res.status(200).json({ succes: true, message: "All Branchs fetched", innder_data: branchs })
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error while fetching Branchs" });
   }
};

//--------------------------Get Branch by id----------------------
const getBranchById = async (req, res) => {
   try {
      const { id } = req.params;

      const branch = await Branch.findById(id);
      if (!branch) {
         return res.status(404).json({ success: false, message: "404 not found: Branch not found" });
      } res.status(200).json({ success: true, message: "Branch fetched", innder_data: branch });

   } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error while fetching Branch" });
   }
};

//--------------------------Update Branch----------------------

const updateBranch = async (req, res) => {
   try {
      const { id } = req.params;
      const { name, address, call_number } = req.body;
      const updatedBranch = await Branch.findByIdAndUpdate(
         id,
         { name, address, call_number },
         { new: true }
      );    
      if (!updatedBranch) {
         return res.status(404).json({ success: false, message: "Branch not found" });
      }
      res.status(200).json({
         succes: true,
         inner_data: updatedBranch
      })
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error while updating Branch" });
   }
}

//-----------------Delete Branch-------------------------

const deleteBranch = async (req, res) => {
   try {
      const { id } = req.params;
      const deletedBranch = await Branch.findByIdAndDelete(id);
      if (deletedBranch) {
         res.status(200).json({ success: true, message: "Branch deleted succesfully" })
      } else {
         res.status(404).json({ success: false, message: "Branch not found" })
      }
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error" });
   }
};

// -------------------------------search Branchs------------------------------

const searchBranch = async (req, res) => {
   try {
      const { query } = req.query;

      if (!query || typeof query != "string") {
         return res.status(400).json({ message: "Invalid search query" });
      }

      const result = await Branch.find({
         $or: [
            { name: { $regex: query, $options: "i" } },
            { address: { $regex: query, $options: "i" } },
            { call_number: { $regex: query, $options: "i" } },
         ]
      });

      if (result.length === 0) {
         return res.json({ message: "Bunday branch topilmadi" });
      }
      res.json(result);
   } catch (err) {
      console.error("Error fetching Branchs:", error);
      res.status(500).json({ message: "Server error: Failed to fetch Branchs" });
   }
};



module.exports = { addBranch, getBranch, getBranchById, updateBranch, deleteBranch, searchBranch };