const express = require("express");
const ejs = require("ejs");
const router = express.Router();
const tableData = require("../template/data");
const fs = require("fs");
const path = require("path");
//生成表单
router.post("/generatorTable", function (req, res, next) {
  // console.log("tableData :>> ", tableData);
  let table = req.body;
  // 数组方便操作hook的引入
  table.actionList = [];
  console.log("req.body :>> ", table);
  for (const action of table.actionSettings) {
    table.actionList.push(action.key);
  }
  const tableTem = fs.readFileSync(
    path.resolve(__dirname, "../template/tableTem.vue.ejs"),
    "utf-8"
  );
  const apiTem = fs.readFileSync(
    path.resolve(__dirname, "../template/apiTem.js.ejs"),
    "utf-8"
  );

  const fileName = table.fileName;
  const viewsDir = table.views;
  const apiDir = table.api;
  // 需要创建目录
  const createPath = table.path;
  // 获取另一个文件夹的名字
  const engineeringName = fs
    .readdirSync(path.resolve(__dirname, "../../"))
    .find((folder) => {
      return folder !== "ejs_generator";
    });
  // 拿到工程文件夹的绝对路径
  const engineeringPath = path.resolve(__dirname, "../../", engineeringName);

  // 生成文件的函数
  const generatorByTemplate = (dir, template, type = "js") => {
    const file = ejs.render(template, table);
    // 目标目录
    const folderPath = createPath
      ? path.join(`${engineeringPath}`, `/src/${dir}/`)
      : path.join(`${engineeringPath}`, `/src/${dir}/${createPath}`);
    if (!fs.existsSync(folderPath)) {
      // 如果目录不存在，则递归创建目录
      fs.mkdirSync(folderPath, { recursive: true });
    }
    const filePath = path.join(folderPath, `${fileName}.${type}`);
    fs.writeFileSync(filePath, file);
  };

  generatorByTemplate(viewsDir, tableTem, "vue");
  generatorByTemplate(apiDir, apiTem, "js");

  res.send("ok");
});

module.exports = router;
