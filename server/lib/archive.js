const path        = require('path');
const archiveType = require('archive-type');
const readChunk   = require('read-chunk');
const _           = require('lodash');
const sharp       = require('sharp');



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

let page_buffer = {}

module.exports.page = function(archive, index, image_size=2048){
  try{
    debugger;
     let file = path.basename(archive);
     let key = `${file}-${index}`;

     if ( page_buffer.key === key ){
      console.log( `Getting page ${index} for ${file} from cache.`);
      return page_buffer.value;
     }else{
      console.log( `Buffer has: ${_.keys(page_buffer)} in memory.`);
     }

     console.log( `Getting page ${index} for ${file}, at ${image_size}px`);
     let adapter = get_adapter(archive);
     let buffer = adapter.page(index);
     let client_image = sharp(buffer) .resize(image_size, image_size)
                                      .max()
                                      .toFormat('jpeg')
                                      .toBuffer()
     
     page_buffer = {key:key, value: client_image};
     return client_image;
   }catch(err){
    console.error(`Error resizing image, ${err.message}`);
    return Promise.reject(err);
   }
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
