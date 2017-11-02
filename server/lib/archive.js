const path        = require('path');
const archiveType = require('archive-type');
const readChunk   = require('read-chunk');
const _           = require('lodash');

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

    const buffer = readChunk.sync(archive, 0, 262);

    let type = archiveType(buffer);

    if ( _.get(type, 'ext') === 'rar'){
      return new Rar(archive);
    }else if (  _.get(type, 'ext') === 'zip'){
      return new Zip(archive);
    }else{
      throw ('Unsupported file type for ' + archive);
    }

    throw new Error(`Unsupported File Type: ${archive}`);
}
