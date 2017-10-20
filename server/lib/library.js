const walk = require("walkdir");
const path = require('path');
const S    = require('string');
/*
 Walk a directory, indexing all folders and files.
 @return: A promise with -> library: { folders: [], files: [] }
 */
module.exports.index = function(location) {
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
