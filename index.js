const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc")

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

// Database connection
async function connectToDB() {
   try {
      await connect(process.env.MONGO_URL)
      console.log("Mongo db is connected")
   }
   catch (error) {
      console.error("MongoDB connection failded", error.message)
   }
}
connectToDB();

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is runnnig on port http://localhost:${PORT}`);

});


//Router
const { role } = require("./routes/roleRoute");
app.use("/role", role);

const { stuffs } = require("./routes/stuffRoute");
app.use("/stuffs", stuffs);

const { stuffroles } = require("./routes/stuffroleRoute");
app.use("/stuffroles", stuffroles);

const { stage } = require("./routes/stageRoute");
app.use("/stage", stage);

const { branch } = require("./routes/branchRoute");
app.use("/branch", branch);

const { groups } = require("./routes/groupRoute");
app.use("/groups", groups);

const { group_stuffs } = require("./routes/group_stuffRoute");
app.use("/group_stuffs", group_stuffs);

const { lesson } = require("./routes/lessonRoute");
app.use("/lesson", lesson);

const { lid_status } = require("./routes/lid_statusRoute");
app.use("/lid_status", lid_status);

const { reason_lid } = require("./routes/reason_lidRoute");
app.use("/reason_lid", reason_lid);

const { lid } = require("./routes/lidRoute");
app.use("/lid", lid);

const { student } = require("./routes/studentRoute");
app.use("/student", student);

const { student_group } = require("./routes/student_groupRoute");
app.use("/student_group", student_group);

const { student_lesson } = require("./routes/student_lessonRoute");
app.use("/student_lesson", student_lesson);

const { payment } = require("./routes/paymentRoute");
app.use("/payment", payment);


const swaggerOptions = {
   definition: {
      openapi: "3.0.0",
      info: {
         title: "User Api",
         version: "1.0.0",
         description: "API Documentation using Swagger",
      },
      servers: [
         {
            url: "http://localhost:3000",
         },
      ],
   },
   apis: ["./routes/*.js"]
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))