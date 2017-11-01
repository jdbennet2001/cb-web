const fs      = require("fs");
const unrar   = require("node-unrar-js");
const path    = require('path');
const _       = require('lodash');

function rar(filename){

  var extractor = unrar.createExtractorFromFile(filename);
  var list = extractor.getFileList();

  var list_entries = [];
  try{

     list_entries = _.last(list).fileHeaders;
  }catch(err){
    console.error(`Error parsing ${filename}, ${err.message}`);
  }

  var files = this.files = _.filter(list_entries, entry => {
    return entry.packSize > 0;
  })

  this.cover = function(){
    let page = _.head(files);
    let result = extractor.extractFiles([page.name]);
    let image = path.join(process.cwd(), page.name);
    let data = fs.readFileSync(image);
    fs.unlink(image);
    return data;
  }

  this.pages = function(){
    return files.length;
  }

  this.page = function(index){
    let page = files[index];
    let result = extractor.extractFiles([page.name]);
    let image = path.join(process.cwd(), page.name);
    let data = fs.readFileSync(image);
    fs.unlink(image);
    return data;
  }
}

module.exports = rar;
