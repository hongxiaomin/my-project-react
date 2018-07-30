/**
 * README
 * Before use this task, DO
 *
 * Add a new package | a new component:
 * () `jspm install 來源:套件名@版號`, if needed or wirte into package.json & config.js will update
 * () put a new component into `./web/zip/src/components/…`
 *
 * Other setting:
 * 1) 'config.js' modify something with setting (normal case it will auto modify by jspm install ...)
 * 2) 'jspm_packages_prod' files could not bundle and necessary (miss them will crash app)
 * 'forBundleAllJspmPackage.js' add library if you want to bundle (exclude dev packages) - auto generate by task
 *
 * then, execute in your terminal
 * 1) `npm install` (for gulp running)
 * 2) `npm run zip` | `./node_modules/.bin/gulp` | `./node_modules/.bin/gulp rezip`
 *
 * @see https://github.com/gulpjs/gulp/blob/master/docs/API.md
 * @see https://github.com/gulpjs/gulp/blob/master/docs/API.md#return-a-promise
 * @see https://github.com/OverZealous/run-sequence
 * @type {[type]}
 */
const fs = require('fs'); // node inner package, 甭 install
const exec = require('child_process').exec; // node inner package, 甭 install
const Q = require('q'); // node inner package, 甭 install
const gulp = require('gulp');
const del = require('del');
const mkdirp = require('mkdirp');
const zip = require('gulp-zip');
const runSequence = require('run-sequence');
/**
 * delete old all jspm_packages
 * @param  {[type]} ) {             } [description]
 * @return {[type]}   [description]
 */
gulp.task('delete:jspm_packages', function() {
  return del(['jspm_packages']).then(paths => {
    console.info('✓ DELETE exist jspm_packages folder done, path are:\n', paths.join('\n'));
  });
});
/**
 * delete old zip file
 * @param  {[type]} ) {             } [description]
 * @return {[type]}   [description]
 */
gulp.task('delete:user-web', function() {
  return del(['user-web.zip']).then(paths => {
    console.info('✓ DELETE exist user-web.zip done, path are:\n', paths.join('\n'));
  });
});
/**
 * delete old bundle-deps-packages file
 * @param  {[type]} ) {             } [description]
 * @return {[type]}   [description]
 */
gulp.task('delete:bundle-deps-packages', function() {
  return del(['bundle-deps-packages.js', 'bundle-deps-packages.js.map']).then(paths => {
    console.info('✓ DELETE exist bundle-deps-packages.js done, path are:\n', paths.join('\n'));
  });
});
/**
 * delete old forBundleAllJspmPackages file
 * @param  {[type]} ) {             } [description]
 * @return {[type]}   [description]
 */
gulp.task('delete:forBundleAllJspmPackages', function() {
  return del(['forBundleAllJspmPackages.js']).then(paths => {
    console.info('✓ DELETE exist forBundleAllJspmPackages.js done, path are:\n', paths.join('\n'));
  });
});

/**
 * create forBundleAllJspmPackages.js file
 * @see forBundleAllJspmPackages.js.sample
 * @see https://stackoverflow.com/questions/33362518/using-gulp-to-parse-json-and-output-the-result-to-a-html-file
 * @param  {[type]} ) {             } [description]
 * @return {[type]}   [description]
 */
gulp.task('create:forBundleAllJspmPackages', function() {
  const deferred = Q.defer();
  const json = require('./package.json');

  let dependencies = `/*
for bundle

let forBundleAllJspmPackages.js to bundle.js & minify it
contain all depedency library in forBundleAllJspmPackages.js declare in src/... using

bundle?
@see http://www.jianshu.com/p/4d55afa2d151
@see http://jspm.io/docs/production-workflows.html
 */\n
`;

  for (const packageName in json.jspm.dependencies) {
    dependencies += `import '${packageName}';\n`;
  }

  fs.writeFile('forBundleAllJspmPackages.js', dependencies, { encoding:'utf8' }, () => {
    console.info('✓ CREATE forBundleAllJspmPackages.js done');
    deferred.resolve();
  })

  return deferred.promise;
});
/**
 * install JSPM, jspm will read package.json and execute install
 * @see http://jspm.io/docs/getting-started.html
 * @param  {[type]} ) {             } [description]
 * @return {[type]}   [description]
 */
gulp.task('install:jspm_packages', function() {
  const deferred = Q.defer();

  exec('jspm install', () => {
    console.info('✓ INSTALL whole jspm_packages library declared in package.json done');
    deferred.resolve();
  })

  return deferred.promise;
});
/**
 * create bundle minify js with dependency library for app running
 * cmd `jspm bundle forBundleAllJspmPackages.js bundle-deps-packages.js --minify`
 * @param  {[type]} ) {             } [description]
 * @return {[type]}   [description]
 */
gulp.task('create:bundle_deps_packages', function() {
  const deferred = Q.defer();

  exec('jspm bundle forBundleAllJspmPackages.js bundle-deps-packages.js --minify', () => {
    console.info('✓ CREATE bundle-deps-packages.js done');
    deferred.resolve();
  })

  return deferred.promise;
});
/**
 * create a tmp folder for zip
 * @param  {[type]} ) {             } [description]
 * @return {[type]}   [description]
 */
gulp.task('create:tmp_folder', function() {
  const deferred = Q.defer();

  mkdirp('./tmp_for_zip', function (err) {
      if (err) {
        console.error(err)
        deferred.resolve();
      } else {
        console.info('✓ CREATE tmp_for_zip folder done')
        deferred.resolve();
     }
  })

  return deferred.promise;
});
/**
 * put jspm_packages_prod into tmp & rename jspm_packages_prod > jspm_packages
 * @param  {[type]} ) {             } [description]
 * @return {[type]}   [description]
 */
gulp.task('copy:jspm_packages_prod', function() {
  return gulp.src('./jspm_packages_prod/**/*')
    .pipe(gulp.dest('./tmp_for_zip/jspm_packages')
    .on('end', () => {
      console.info('✓ COPY jspm_packages_prod into tmp_for_zip folder and rename > jspm_packages done')
    }));
});
/**
 * put some file into tmp (kernel files)
 *
 * ./bin/
 * ./css/
 * ./fonts/
 * ./src/
 * ./app.js
 * ./bundle-deps-packages.js
 * ./config.js
 * ./index.html
 * ./package.json
 * ./run-server.bat
 * ./run-server.sh
 *
 * @see https://github.com/gulpjs/gulp/issues/165 (Can't exclude directories using src?)
 * @param  {[type]} ) {             } [description]
 * @return {[type]}   [description]
 */
gulp.task('copy:app_needed_files', function() {
  return gulp.src([
      './**',
      '!./{jspm_packages,jspm_packages/**}',
      '!./{jspm_packages_prod,jspm_packages_prod/**}',
      '!./{node_modules,node_modules/**}',
      '!./{tmp_for_zip,tmp_for_zip/**}',
      '!./forBundleAllJspmPackages.js',
      '!./bundle-deps-packages.js.map', // (no need to debug on line)
      '!./gulpfile.js',
      '!./user-web.zip',
    ])
    .pipe(gulp.dest('./tmp_for_zip')
    .on('end', () => {
      console.info('✓ COPY app needed files into tmp_for_zip folder done are:')
      console.info('  bin/');
      console.info('  css/');
      console.info('  fonts/');
      console.info('  src/');
      console.info('  app.js');
      console.info('  bundle-deps-packages.js');
      console.info('  bundle-deps-packages.js.map');
      console.info('  config.js');
      console.info('  index.html');
      console.info('  package.json');
      console.info('  run-server.bat');
      console.info('  run-server.sh');
    }));
});
/**
 * zip tmp & give a zip name
 * @see https://github.com/sindresorhus/gulp-zip
 * @param  {[type]} ) {             } [description]
 * @return {[type]}   [description]
 */
gulp.task('zip:user-web', function() {
  return gulp.src('tmp_for_zip/**/*')
    .pipe(zip('user-web.zip'))
    .pipe(gulp.dest('./')
    .on('end', () => {
      console.info('✓ ZIP tmp_for_zip/**/* to user-web.zip done')
    }));
});
/**
 * delete tmp folder
 * @param  {[type]} ) {             } [description]
 * @return {[type]}   [description]
 */
gulp.task('delete:tmp_for_zip', function() {
  return del(['tmp_for_zip']).then(paths => {
    console.info('✓ DELETE exist tmp_for_zip folder done, path are:\n', paths.join('\n'));
  });
});
/**
 * run sequence tasks
 * @see https://css-tricks.com/gulp-for-beginners/
 * @see https://github.com/OverZealous/run-sequence
 */
gulp.task('default', function(callback) {
  console.info(`
gulp.js will run sequence task as below:

1)  delete:jspm_packages
2)  delete:user-web
3)  delete:bundle-deps-packages
4)  delete:forBundleAllJspmPackages
5)  create:forBundleAllJspmPackages
6)  install:jspm_packages
7)  create:bundle_deps_packages
8)  create:tmp_folder
9)  copy:jspm_packages_prod
10) copy:app_needed_files
11) zip:user-web
12) delete:tmp_for_zip
13) delete:jspm_packages
`);

  runSequence(
    'delete:jspm_packages',
    'delete:user-web',
    'delete:bundle-deps-packages',
    'delete:forBundleAllJspmPackages',
    'create:forBundleAllJspmPackages',
    'install:jspm_packages',
    'create:bundle_deps_packages',
    'create:tmp_folder',
    'copy:jspm_packages_prod',
    'copy:app_needed_files',
    'zip:user-web',
    'delete:tmp_for_zip',
    'delete:jspm_packages',
    () => {
      console.info('\n✓ Gulp run all task, please check new zip file\n');
    });
});

gulp.task('rezip', function(callback) {
  runSequence(
    // 'delete:jspm_packages',
    // 'delete:user-web',
    // 'delete:bundle-deps-packages',
    // 'delete:forBundleAllJspmPackages',
    'create:forBundleAllJspmPackages',
    'install:jspm_packages',
    'create:bundle_deps_packages',
    'create:tmp_folder',
    'copy:jspm_packages_prod',
    'copy:app_needed_files',
    'zip:user-web',
    // 'delete:tmp_for_zip',
    // 'delete:jspm_packages',
    () => {
      console.info('Gulp run all task, please check new zip file');
    });
});
