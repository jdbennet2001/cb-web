const express       = require('express')
const path          = require('path')
const webpack       = require('webpack')
const logger        = require('../build/lib/logger')
const webpackConfig = require('../build/webpack.config')
const project       = require('../project.config')
const compress      = require('compression')
const jsonfile      = require('jsonfile');

const app = express()
app.use(compress())

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  logger.info('Enabling webpack development and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : path.resolve(project.basePath, project.srcDir),
    hot         : true,
    quiet       : false,
    noInfo      : false,
    lazy        : false,
    stats       : 'normal',
  }))
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(path.resolve(project.basePath, 'public')))

  let {cover, model, index} = require('./lib/library');
  let {page} = require('./lib/archive');

  app.get('/model', function(req, res){
    res.json( model() );
  });

  app.get('/index', function(req, res){
    let path_to_library = path.join(__dirname, '../tests/archives')
    index(path_to_library);
  })

  /*
   Return the files in a given directory
   */
  app.get('/files', function(req, res){

    let archives = model().archives;
    let files = archives.filter(archive => {
      return (archive.directory === req.query.directory)
    })

    res.json(files);
  });


  /*
   Return the cover for a given issue.
   @input the issue name (No path, example 'Spider-Man 01.cbr')
   */
  app.get("/cover/:name", function(req, res) {
    let name = decodeURIComponent(req.params.name);
    cover(name).then(data => {
      res.contentType('image/jpeg');
       res.end(data, 'binary');
    }, err => {
      const path_to_balloon = process.cwd() + '/public/icons/balloon.png'
      res.sendFile(path_to_balloon);
    })

  });

 /*
   Return the cover for a given issue.
   @input the issue name (No path, example 'Spider-Man 01.cbr')
   */
  app.get("/page", function(req, res) {
    debugger;
    try{
      let archive = decodeURIComponent(req.query.archive);
      let data = page(archive, req.query.number);
          res.contentType('image/jpeg');
          res.end(data, 'binary');
    } catch(err) {
      const path_to_balloon = process.cwd() + '/public/icons/balloon.png'
      res.sendFile(path_to_balloon);
    }

  });


  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  logger.warn(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(path.resolve(project.basePath, project.outDir)))
}

module.exports = app
