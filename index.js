const fsPure = require("fs")
const fs = fsPure.promises;
const path = require("path");
const os = require("os");
const core = require('@actions/core');
const {run} = require('setup-act')
const {DEFAULT_VERSION} = require('./version.json')
const toolVersion = core.getInput('version');
run({
  version: toolVersion || DEFAULT_VERSION
}).then(()=>{
  // check if already exist
  const actRcPath = path.resolve(os.homedir(), '.actrc');
  const isActRcExist = fsPure.existsSync(actRcPath);
  if(!isActRcExist){
      // set rc
      const actRC = `-P ubuntu-latest=actionsflow/act-environment:v1
      -P ubuntu-18.04=actionsflow/act-environment:v1
      -P ubuntu-20.04=actionsflow/act-environment:v1`;
      return fs.writeFile(actRcPath, actRC);
  }

}).catch(e=>{
  core.setFailed(`Action failed with error ${e.message}`);
})