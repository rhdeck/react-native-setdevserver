#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
//Get my directory
var thisPath = process.argv[1];
var thisPath = path.dirname(thisPath); //bin directory
var thisPath = path.dirname(thisPath); //dependency directory
var thisPath = path.dirname(thisPath); // node_modules
var baseName = path.basename(thisPath);
if (!baseName.startsWith("node_modules")) {
  console.log("This is not a dependency: ", thisPath);
  process.exit();
}
var thisPath = path.dirname(thisPath); // parent
const packagePath = thisPath + "/package.json";
if (!fs.existsSync(packagePath)) {
  exit();
}
try {
  const package = require(packagePath);
  const ds = package.developmentServer;
  if (ds && ds.length) {
    process.stdout.write(ds);
  }
} catch (err) {}
