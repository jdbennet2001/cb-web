const walk      = require("walkdir");
const path      = require('path');
const S         = require('string');
const PouchDB   = require('pouchdb');
const nconf     = require('nconf');
const _         = require('lodash');
const fs 				= require("fs");
const jsonfile	= require('jsonfile');
const util 			= require('util');
const resizeImg = require('resize-img');
const each 			= require('promise-each');
const sizeOf 		= require('image-size');

const db    = new PouchDB('covers');

//Update internal index during testing...
let path_to_library = path.join(__dirname, '../../tests/archives')

const {cover, pages, page}   = require('./archive');

const path_to_conf = path.join(__dirname, '../../config/app.json');
nconf.argv()
	 .env()
	 .file(path_to_conf);

let path_to_model = path.join(__dirname, '../data/model.json');
let model = jsonfile.readFileSync(path_to_model);

/*
 Return a list of all libraries on the system
 */
module.exports.model = function(){
	return model;
}

module.exports.cover = function(name){
	return db.allDocs().then( docs => {
		return db.getAttachment(name, 'cover.jpg')
	});
}


module.exports.index = function(directory){

		let folders = index_folders(directory);
		let files   = index_files(directory);
		let archives = files.map(file =>  index_file(file));

		//Filter out empty responses..
	  	archives = _.filter(archives, archive =>{
			return !_.isEmpty(archive);
		})

		//Write data to disk
		jsonfile.writeFileSync(path_to_model, {folders, archives}, {spaces: 4} );

		//Index covers
		let covers =  index_covers( files );
		covers.then( ()=> {
			console.log('Indexing complete...');
		}, err =>{
			console.error(`Error indexing covers ${err.message}`);
			console.error( util.inspect(err) );
		})

}

/*
 Return a nested structure of directory objects of the form:
 {
 		name
		directory
		folders:  []
 }
 */
function index_folders(directory){

	let name = path.basename(directory);


	let contents = scan_directory(directory);
	let folders = contents.folders.map(folder => {
		return index_folders(folder);
	})
	return {name, directory, folders};

}

/*
 Return a flat array of all files in the directory (including sub directory)
 */
function index_files(directory){

	let contents = scan_directory(directory);

	let files = _.reduce(contents.folders, function(files, folder){
			return  _.concat(files, index_files(folder));
	}, contents.files)

	let archive_extensions = ['.cbz', '.zip', '.rar', '.cbr'];
	files = _.filter(files, file=>{
		let extention = path.extname(file).toLowerCase();
		return _.includes(archive_extensions, extention);
	})

	return files;
}

/*
 Return information about a given file on the system.
 */
function index_file(file){
	console.log(`Indexing file: ${file}`);

	//Return entry from cache, if possible
	let entry = _.find(model.archives, archive =>{
		return archive.location === file;
	})
	if (entry){
		return entry;
	}

	try{
		let length = pages(file);
		let name 	 = path.basename(file);
		let location = file;
		let directory = path.dirname(file);
		return {length, name ,location, directory};
	}catch(err){
		console.error(`Error indexing file: ${err.message} for ${file}`);
	}
}

/*
 Find all new archives, from a list of files, and add their covers to the database
 */
function index_covers(files) {
  //Get all covers currently in database
  return db.allDocs().then(doc => {
  	debugger;
    let covers = doc.rows.map(row => row.id);

    let queued = files.filter(file => {
      return !_.includes(covers, path.basename(file));
    });

    return Promise.resolve(queued).then(
      each(val => { return index_cover(val);})
    );

  });
}


/*
 Extract the cover from a given archive and file it in pouchdb
 */
 function index_cover(file){

	 //Calculate the appropriate scaling factor
	try {

	 	let image 	= cover(file);
		let key 	= path.basename(file);
		
		const dimensions = sizeOf(image);
		const h_scale = dimensions.height / 360;
		const width = _.floor(dimensions.width / h_scale);

		//Resize, and file
		 return resizeImg(image, {height: 360, width:width}).then(buf =>{
		 	return db.putAttachment(key, 'cover.jpg', buf, 'test/jpg');
		 }).then(result=>{
			 console.log(`Added cover ${key} to database`);
		 }).catch( err => {
			 console.error(`Error adding cover ${key} to database, ${err.message}`);
			 return Promise.resolve(err);
		 })

	} catch (err) {
		console.error(`Error adding ${file} to db - ${err.message}`);
		return Promise.resolve(err);
	}

	 
 }

/*
 Return fully qualified paths for all  useful files in a directory
 {
 	files: []
	folders: []
 }
 */
function scan_directory(directory){

	let catalog_model = fs.readdirSync( directory );

	console.log(`Scanning folder: ${directory}`);

	//Remove system generated directories / thumbnails
	catalog_model = catalog_model.filter(entry => {
		return !S(entry).startsWith('.') && !S(entry).startsWith('_');
	})

	//Map basename to fully qualified path names
	catalog_model = catalog_model.map( entry => {
		return path.join(directory, entry);
	})

	//Seperate out files and folders
	let files = catalog_model.filter(entry => {
			return fs.statSync(entry).isFile();
	})

	let folders = catalog_model.filter(entry => {
			return fs.statSync(entry).isDirectory();
	})

	return {files, folders};

}
