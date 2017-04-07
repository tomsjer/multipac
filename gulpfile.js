/**
 *
 * Gulp plugins
 *
 */

const gulp = require('gulp');
const browserify = require('browserify');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babel = require('babelify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const fork = require('child_process').fork;
const exec = require('child_process').exec;
const ncp = require('copy-paste');

/**
 *
 * Paths
 *
 */
const srcDir = `${__dirname}/src`;
const scriptsDir = `${srcDir}/scripts`;
const stylesDir = `${srcDir}/styles`;
const tmpDir = `${__dirname}/.tmp`;
const publicDir = `${__dirname}/public`;
const serverDir = `${__dirname}/server`;
const configFile = `${__dirname}/config.json`;

/**
 *
 * Network settings
 *
 */
const getIpAddress = require(`${scriptsDir}/utils/getIpAddresses.js`);
const fs = require('fs');
const os = require('os');
const interfaces = os.networkInterfaces();
const IP_ADDRESS = getIpAddress(interfaces);
const SERVER_PORT = 8080;
const config = require('./config.json');
config.ip = IP_ADDRESS;
config.port = SERVER_PORT;
fs.writeFileSync('./config.json', JSON.stringify(config));

/**
 *
 * Server.js settings
 *
 */

let server;
const reload = function reload() {
  if(server.killed) {
    console.log('return');
    return;
  }
  server.send({ reload: true });
};

gulp.task('default', ['js', 'concat-styles']);

// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['js', 'concat-styles', 'server'], ()=>{

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  // gulp.watch(`${__dirname}/server.js`, ['kill-server', 'server']);
  gulp.watch(`${serverDir}/server.js`, ['kill-server', 'server']);
  gulp.watch(`${configFile}`, ['kill-server', 'server', 'js-watch']);
  gulp.watch(`${scriptsDir}/**/*.js`, ['js-watch']);
  gulp.watch(`${stylesDir}/**/*.scss`, ['sass-watch']);
  gulp.watch(`${publicDir}/*.html`, ()=>{ reload(); });
});

// initiate another node process with the server and ws logic.
gulp.task('server', (done) => {

  server = fork(`${serverDir}/server.js`, [], {
    silent: true,
    execArgv: ['--inspect'],
  });
  server.on('message', (msg) => {
    if(msg.ready) {
      const cmd = (os.platform() === 'win32') ? `start chrome ${config.protocol}://${config.ip}:${config.port}` :
                                                `chrome ${config.protocol}://${config.ip}:${config.port}`;
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(error, stdout, stderr);
      });

      done();
    }
  });

  server.stdout.on('data', (data) => {
    console.log(`[server] ${data}`);
  });

  server.stderr.on('data', (data) => {
    // Couldnt launch it from here, chrome <chrome://*> not allowed
    // Instead, copy the chrome-devtools url to clipboard.
    if(data.indexOf('chrome-devtools') !== -1) {
      ncp.copy(data.toString().substr(data.indexOf('chrome-devtools')));
    }
  });

  server.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

});

// kill the server.js node process
gulp.task('kill-server', () => {
  return server.kill();
});

// process JS files and return the stream.
// restart express server
gulp.task('js', ()=>{
  const bundler = browserify(`${scriptsDir}/client/index.js`, {
    debug: true,
  }).transform(babel);
  return bundler.bundle()
    .on('error', (err)=>{
      console.error(err);
      this.emit('end');
    })
    .pipe(source('build.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${publicDir}/js/`));
});

// create a task that ensures the `js` task is complete before
// reloading browsers and express server gets reinitiated.
// gulp.task('js-watch', ['js', 'kill-server', 'server'], (done)=>{
gulp.task('js-watch', ['js'], (done)=>{
  reload();
  done();
});

gulp.task('sass-watch', ['concat-styles'], (done)=>{
  reload();
  done();
});

gulp.task('concat-styles', ['sass'], ()=>{
  return gulp.src(`${tmpDir}/**.css`)
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${publicDir}/css/`));
});

gulp.task('sass', ()=>{
  return gulp.src(`${stylesDir}/*.scss`)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(`${tmpDir}`));
});
