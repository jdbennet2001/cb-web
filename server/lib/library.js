const walk      = require("walkdir");
const path      = require('path');
const S         = require('string');
const PouchDB   = require('pouchdb');
const nconf     = require('nconf');
const _         = require('lodash');

const covers    = new PouchDB('covers');

const {cover}   = require('./archive');

const path_to_conf = path.join(__dirname, '../../config/app.json');
nconf.argv()
	 .env()
	 .file(path_to_conf);

/*
 Return a list of all libraries on the system
 */
module.exports.libraries = function(){
  let libraries = nconf.get('libraries');
  return libraries;
}

module.exports.cover = function(){

}

module.exports.index = function(location){

  //Generate a listing of all files/folder for a given library
  let contents = walk_library(location);

  //Extract all covers into PouchDB for later use
  contents.then(index => {
    cache_covers(index.files);
  })

  //Return data to UI / Test framework
  return contents;
}

/*
 Walk a directory, indexing all folders and files.
 @return: A promise with -> library: { folders: [], files: [] }
 */
function walk_library(location) {
  var emitter = walk(location);

  let library = { folders: [], files: [] };

  return new Promise(function(resolve, reject) {

    emitter.on("file", function(filename, stat) {

      let basename = path.basename(filename);
      if ( S(basename).startsWith('.') || S(basename).startsWith('_') ){
        return;   //System generated file
      }
      else if ( stat.size <= 12*1024 ){
        return;   //Thumbnail
      }

      library.files.push(filename);

    });

    emitter.on("directory", function(filename, stat) {
      library.folders.push(filename);
    });

    emitter.on("end", function() {
      resolve(library);
    });

  });

};

function cache_covers(files){
  let file = _.head(files);
  debugger;
  let page = cover(file);
  debugger;
}
