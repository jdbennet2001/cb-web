const assert = require('chai').assert;

const admZip = require('adm-zip');
const path    = require('path');
const _       = require('lodash');
const S       = require('String');

// Read the archive file into a typedArray

const path_to_file = path.join(__dirname, '../archives/other/running.cbz')

describe('Can extract CBZ file', function() {
    it('Should return the first page of the archive', function() {

      var zip = new admZip(path_to_file);
      var zip_entries = zip.getEntries();
      zip_entries = _.filter(zip_entries, zip_entry => {
        return !S(zip_entry.entryName).startsWith('__')
      })
    });
});
