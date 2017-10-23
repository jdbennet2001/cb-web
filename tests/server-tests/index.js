const assert = require('chai').assert;

const path    = require('path');
const _       = require('lodash');
const {index} = require('../../server/lib/Library')

// Read the archive file into a typedArray

const path_to_library = path.join(__dirname, '../archives/')

describe('Can walk library structure', function() {

    it('Should return all files and folders.', function() {
      let catalog_model = index(path_to_library);
      assert.property(catalog_model, 'folders');
      assert.property(catalog_model, 'files');
    });

});
