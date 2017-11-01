const path        = require('path');
const archiveType = require('archive-type');
const readChunk   = require('read-chunk');

const Zip      = require('./adapters/zip');
const Rar      = require('./adapters/rar');
const Tar      = require('./adapters/tar');

module.exports.cover = function(archive){
  let adapter = get_adapter(archive);
  return adapter.cover();
}

module.exports.pages = function(archive){
  let adapter = get_adapter(archive);
  return adapter.pages();
}

module.exports.page = function(archive, index){
   let adapter = get_adapter(archive);
  return adapter.page(index);
}

function get_adapter(archive){
    let extention = path.extname(archive).toLowerCase();

    debugger;
    const buffer = readChunk.sync(archive, 0, 262);

    let type = archiveType(buffer);

    if ( type.ext === 'rar'){
      return new Rar(archive);
    }else if ( type.ext === 'zip'){
      return new Zip(archive);
    }

    if (extention === '.cbz' || extention === '.zip'){
      return new Zip(archive);
    }else if ( extention === '.cbr' || extention === '.rar'){
      return new Rar(archive);
    }else if ( extention === '.cbt' || extention === '.tar'){
      return new Tar(archive);
    }

    throw new Error(`Unsupported File Type: ${archive}`);
}
