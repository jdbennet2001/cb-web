const assert = require('chai').assert;

const fs      = require("fs");
const unrar   = require("node-unrar-js");
const path    = require('path');
const _       = require('lodash');

// Read the archive file into a typedArray

const path_to_file = path.join(__dirname, '../archives/spidey.cbr')

describe('Can extract CBR file', function() {
    it('Should return the first page of the archive', function() {
      // var buf = Uint8Array.from(fs.readFileSync(path_to_file)).buffer;
      var extractor = unrar.createExtractorFromFile(path_to_file);
      var list = extractor.getFileList();
      var list_status = _.head(list);
      assert.equal(list_status.state, 'SUCCESS');
      var list_entries = _.last(list).fileHeaders;

      var files = _.filter(list_entries, entry => {
        return entry.packSize > 0;
      })
      let cover = _.head(files);
      let result = extractor.extractFiles([cover.name]);
      let image = path.join(__dirname, '../', cover.name);
      debugger;
      let file_exists = fs.existsSync(image);
      assert.isTrue(file_exists, `File should exist at ${image}`);
      fs.unlinkSync(image);
    });
});
