const {pipeline, Transform} = require("fs");
const {unzip, readDir, greyScale} = require("./ioHandler.js");

pipeline(
  unzip(),
  greyScale()
)