// server.js
const express = require("express");
const cors = require("cors");
const structureRouter = require("./routes/structure");
const tableRouter = require("./routes/table");
const app = express();
app.use(express.json());
app.use(cors());

//路由部分
app.use("/structure", structureRouter);
app.use("/table", tableRouter);

app.listen(3000, () => {
  console.log("服务器端口为3000");
});
