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
const open = require('open');

/**
 *
 * Network settings
 *
 */
function getIpAddress(interfaces) {
  let ips = [];
  Object.keys(interfaces).forEach((ifname)=>{
    let alias = 0;

    interfaces[ifname].forEach((iface)=>{
      if (iface.family !== 'IPv4' || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        // console.log(ifname + ':' + alias, iface.address);
      }
      else {
        // this interface has only one ipv4 adress
        // console.log(ifname, iface.address);
      }
      alias++;
      ips.push(iface.address);
    });
  });
  // Keep just the first one.
  return ips[0];
}
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

let child;
const reload = function reload() {
  if(child.killed) {
    return;
  }
  child.send({ reload: true });
};

gulp.task('default', ['js', 'concat-styles']);

// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['js', 'concat-styles', 'server'], ()=>{

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  // gulp.watch(`${__dirname}/server.js`, ['kill-server', 'server']);
  gulp.watch(`${__dirname}/server.js`, ['kill-server', 'server'], reload);
  gulp.watch(`${__dirname}/config.json`, ['kill-server', 'server', 'js-watch'], ()=>{
    open(`${config.protocol}://${IP_ADDRESS}:${SERVER_PORT}`, 'Google Chrome', (err)=>{
      console.log(err);
    });
  });
  gulp.watch(`${__dirname}/app/scripts/*.js`, ['js-watch'], ()=>{ reload();});
  gulp.watch(`${__dirname}/app/styles/*.scss`, ['sass-watch'], reload);
  gulp.watch(`${__dirname}/public/*.html`, reload);
});

// initiate another node process with the server and ws logic.
gulp.task('server', (done) => {

  child = fork(`${__dirname}/server.js`, [],{
      execArgv:['--inspect']
    });
  child.on('message', (msg) => {
    if(msg.ready) {
      done();
    }
  });

});

// kill the server.js node process
gulp.task('kill-server', () => {
  return child.kill();
});

// process JS files and return the stream.
// restart express server
gulp.task('js', ()=>{
  const bundler = browserify(`${__dirname}/app/scripts/index.js`, { debug: true }).transform(babel);
  return bundler.bundle()
    .on('error', (err)=>{
      console.error(err);
      this.emit('end');
    })
    .pipe(source('build.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${__dirname}/public/js/`));
});

// create a task that ensures the `js` task is complete before
// reloading browsers and express server gets reinitiated.
// gulp.task('js-watch', ['js', 'kill-server', 'server'], (done)=>{
gulp.task('js-watch', ['js'], (done)=>{
  reload();
  done();
});

gulp.task('sass-watch', ['concat-styles'], (done)=>{
  done();
});

gulp.task('concat-styles', ['sass'], ()=>{
  return gulp.src('./.tmp/**.css')
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${__dirname}/public/css/`));
});

gulp.task('sass', ()=>{
  return gulp.src(`${__dirname}/app/styles/*.scss`)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(`${__dirname}/.tmp`));
});
