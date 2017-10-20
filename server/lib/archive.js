const path     = require('path');

const Zip      = require('./adapters/zip');
const Rar      = require('./adapters/rar');
const Tar      = require('./adapters/tar');

module.exports.cover = function(archive){
  let adapter = get_adapter(archive);
  return adapter.cover();
}

module.exports.pages = function(archive){

}

module.exports.page = function(archive, index){

}

function get_adapter(archive){
    let extention = path.extname(archive).toLowerCase();

    if (extention === '.cbz' || extention === '.zip'){
      return new Zip(archive);
    }else if ( extention === '.cbr' || extention === '.rar'){
      return new Rar(archive);
    }else if ( extention === '.cbt' || extention === '.tar'){
      return new Tar(archive);
    }

    throw new Error(`Unsupported File Type: ${archive}`);
}
