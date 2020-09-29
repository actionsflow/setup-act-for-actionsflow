const core = require('@actions/core');
const {run} = require('setup-act')
const {DEFAULT_VERSION} = require('./constans')

const toolVersion = core.getInput('version');
run({
  version: toolVersion || DEFAULT_VERSION
}).catch(e=>{
  core.setFailed(`Action failed with error ${e.message}`);
})