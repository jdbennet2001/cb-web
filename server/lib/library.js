const walk      = require("walkdir");
const path      = require('path');
const S         = require('string');
const PouchDB   = require('pouchdb');
const nconf     = require('nconf');
const _         = require('lodash');
const promisify = require("es6-promisify");
const fs 				= require("fs");
const jsonfile	= require('jsonfile');


const covers    = new PouchDB('covers');
const read_dir = promisify(fs.readDir);

const {cover}   = require('./archive');

const path_to_conf = path.join(__dirname, '../../config/app.json');
nconf.argv()
	 .env()
	 .file(path_to_conf);

/*
 Return a list of all libraries on the system
 */
module.exports.model = function(){

}

module.exports.cover = function(){

}

module.exports.index = function(directory){

		let folders = index_folders(directory);
		let files   = index_files(directory);

		const path_to_model = path.join(__dirname, '../data/model.json');
		jsonfile.writeFileSync(path_to_model, {folders, files}, {spaces: 4} );

		return {folders, files}

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

	return files;
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
