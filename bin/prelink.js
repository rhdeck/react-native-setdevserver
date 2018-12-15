#!/usr/bin/env node
var pbxproj = require("@raydeck/xcode");
var fs = require("fs");
var path = require("path");
var glob = require("glob");
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
var iosPath = thisPath + "/ios";
if (!fs.existsSync(iosPath)) {
  console.log("Could not find ios in ", thisPath, iosPath);
  console.log(fs.readdirSync(thisPath));
  process.exit(1);
}
xpdir = glob.sync(iosPath + "/*.xcodeproj")[0];
if (xpdir.length === 0) {
  console.log("Could not find xcodeproj directory inside: ", iosPath);
  process.exit(1);
}
let filename = xpdir + "/project.pbxproj";
let properties = {
  SWIFT_VERSION: "4.0"
};
if (!fs.existsSync(filename)) {
  console.log("Could not find pbxproj file:", filename);
  process.exit(1);
}
var proj = pbxproj.project(filename);
replaceVal =
  '"export NODE_BINARY=node\\nexport RNDEVSERVER=`../node_modules/react-native-setdevserver/bin/getip.js`\\n../node_modules/react-native-setdevserver/bin/react-native-xcode.sh"';
proj.parse(function(err) {
  Object.keys(proj.hash.project.objects.PBXShellScriptBuildPhase).forEach(
    key => {
      let container = proj.hash.project.objects.PBXShellScriptBuildPhase[key];
      const oldVal = container.shellScript;
      if (oldVal && oldVal.length) {
        if (
          oldVal.startsWith(
            '"export NODE_BINARY=node\\n../node_modules/react-native/scripts/react-native-xcode.sh'
          )
        ) {
          //lets replace it
          console.log("Adding reference to new shell script code");
          container.shellScript = replaceVal;
        }
      }
    }
  );
  const out = proj.writeSync();
  fs.writeFileSync(filename, out);
});
