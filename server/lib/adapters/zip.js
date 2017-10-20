const admZip = require('adm-zip');
const path    = require('path');
const _       = require('lodash');
const S       = require('String');

function zip(filename){

  var zip = new admZip(filename);
  var zip_entries = zip.getEntries();
  zip_entries = _.filter(zip_entries, zip_entry => {
    return !S(zip_entry.entryName).startsWith('__')
  })

this.cover = function(){
  debugger;
  let zip_entry = _.head(zip_entries);
  return zip_entry.getData();
}

this.pages = function(){
  return zip_entries.length;
}

this.page = function(index){

}

}

module.exports = zip;
