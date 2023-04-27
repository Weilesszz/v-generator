const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// router.get("/", function (req, res, next) {
//   res.send("admin进入路由咯");
// });

//获取项目结构
router.get("/getStructure", (req, res, next) => {
  const engineeringName = fs
    .readdirSync(path.resolve(__dirname, "../../"))
    .find((folder) => {
      return folder !== "ejs_generator";
    });
  const apiDir = path.join(__dirname, `../../${engineeringName}/src/api`);
  const viewDir = path.join(__dirname, `../../${engineeringName}/src/views`);
  const getFolderTree = (dirname) => {
    const stats = fs.statSync(dirname);
    if (!stats.isDirectory()) {
      return null;
    }
    const node = {
      name: path.basename(dirname),
      type: "folder",
      // children: [],
    };
    try {
      const files = fs.readdirSync(dirname);
      for (let file of files) {
        const childPath = path.join(dirname, file);
        const childNode = getFolderTree(childPath);
        if (childNode) {
          // node.children = [];
          if (!node.children) {
            node.children = [];
          }
          node.children.push(childNode);
        }
      }
    } catch (err) {
      console.error(`发生错误在${dirname}`, err);
    }
    return node;
  };
  const apiStructure = getFolderTree(apiDir);
  const viewStructure = getFolderTree(viewDir);
  res.json({ api: apiStructure, views: viewStructure });
});

module.exports = router;
