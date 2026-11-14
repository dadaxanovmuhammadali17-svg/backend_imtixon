const { Stuff } = require("../model/stuffSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//----------------post Register---------------------------------

const postRegister = async (req, res) => {
   try {
      const {
         firstname,
         lastname,
         phone_number,
         login,
         parol,
         is_active,

      } = req.body;
      const existingStuff = await Stuff.findOne({ login });

      console.log(existingStuff)

      if (existingStuff) {
         return res.status(400).json({
            success: false,
            message: "Bu nom bilan ro'yxatdan o'tgan xodim mavjud.",
         });
      } else {
         const hashedPassword = await bcrypt.hash(parol, 10);
         const newStuff = new Stuff({
            firstname,
            lastname,
            phone_number,
            login,
            parol: hashedPassword,
            is_active,
         });
         await newStuff.save();
         return res.status(201).json({
            success: true,
            message: "Ro'yxatdan o'tish muvaffaqiyatli yakunlandi.",
         });
      }
   } catch (error) {
      console.error("Xato:", error);
      return res.status(500).json({
         success: false,
         message: "Server xatosi: Ro'yxatdan o'tish jarayonida xatolik yuz berdi",
      });
   }
};

//-----------------Login------------------------------------------------
const postLogin = async (req, res) =>{
   try{
      const {login, parol} = req.body;

      const stuff = await Stuff.findOne({ login });
      console.log(stuff);
      if (!stuff) {
         return res.status(401).json({
            success: false,
            message:"Login is invalid!",
         });
      }
      const passwordMatch = await bcrypt.compare(parol, stuff.parol);
      if(!passwordMatch){
         return res.status(401).json({
            success:false,
            message: "Login or parol is invalid!",
         })
      }
      const token = jwt.sign({ login: stuff.login}, "secret");
      return res.json({
         message:"Token",
         token: token,
      });
   } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({
         success: false,
         message: "Server error: An error ocurred during the login process.",
      });
   }
};

//---------------------------Get Stuffs-----------------------------------
const getStuffs = async (req, res) => {
   try {
      const stuffs = await Stuff.find({});
      res.json({
         success: true,
         message: "Barcha xodimlar ro'yxati olingan.",
         innerData: stuffs,
      });
   } catch (error) {
      console.error("Error fetching stuffs;", error);
      res.status(500).json({
         success: false,
         message: "Server xatosi: xodimlarni olishda xato yuz berdi."
      });
   }
}

//------------------get Stuff by id--------------

const getStuffById = async (req, res) => {
   try {
      const stuffId = req.params.id;

      const stuff = await Stuff.findById(stuffId);
      if (!stuff) {
         return res.status(404).json({ message: "Stuff not found" });
      }

      res.json({ message: "Stuff found", stuff });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" })
   }
}

//----------------------Delete Stuff-------------------------------

const deleteStuffById = async (req, res) => {
   try {
      const { id } = req.params;
      const stuff = await Stuff.findByIdAndDelete(id);
      if (stuff) {
         res.status(200).json({
            success: true,
            message: "muvaffaqiyatli o'chirildi",
            deleted_Ssuff: stuff.firstname,
         });
      } else {
         res.status(404).json({ success: false, message: "Stuff not found" });
      }
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error", error: err.message });
   }

};

//----------------------------Update---------------------------------

const updatedStuff = async (req, res) => {
   try {
      const { id } = req.params;
      const { phone_number, lastname, firstname, login, parol, is_active } = req.body;
      const updateStuff = await Stuff.findByIdAndUpdate(
         id,
         {  phone_number, lastname, firstname, login, parol,  is_active },
         { new: true },
      );
      if (!updateStuff) {
         return res.status(404).json({
            success: true,
            message: "Stuff not found",
         });
      }
      res.json({
         success: true,
         message: "Stuff update succesfully!",
         Stuff: updateStuff,
      })
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error", error: err.message });
   }
};

// -------------------------------search Stuffs------------------------------

const searchStuffs = async (req, res) => {
   try {
      const { query } = req.query;

      if (!query || typeof query != "string") {
         return res.status(400).json({ message: "Invalid search query" });
      }

      const result = await Stuff.find({
         $or: [
            { firstname: { $regex: query, $options: "i" } },
            { lastname: { $regex: query, $options: "i" } },
         ]
      });

      if (result.length === 0) {
         return res.json({ message: "Bunday xodim topilmadi" });
      }
      res.json(result);
   } catch (err) {
      console.error("Error fetching stuffs:", error);
      res.status(500).json({ message: "Server error: Failed to fetch Stuffs" });
   }
};


module.exports = {
   postRegister,
   getStuffs,
   getStuffById,
   deleteStuffById,
   updatedStuff,
   searchStuffs,
   postLogin,
}