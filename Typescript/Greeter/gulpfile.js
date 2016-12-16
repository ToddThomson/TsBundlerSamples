// Node related
var chalk = require('chalk');

// Gulp build related
const gulp = require( 'gulp' );
const del = require( "del" );
const concat = require( 'gulp-concat' );
const rimraf = require( 'gulp-rimraf' );
const replace = require( 'gulp-replace' );
const htmlreplace = require( 'gulp-html-replace' );
const uglify = require('gulp-uglify');
const systemBuilder = require( "systemjs-builder" );
const tsb = require( 'tsbundler' );

var bundlerOptions = {
    logLevel: 0,
    verbose: true
};

gulp.task( "ts", function() {
    var bundleBuilder = tsb.builder( "./src/app/tsconfig.json", bundlerOptions );

    return bundleBuilder.src()
        .pipe( gulp.dest( './' ) );

} );

gulp.task( 'bundle', ['ts'], function() {

    var builder = new systemBuilder( 'src', './src/system.config.js' );

    return builder.buildStatic( 'app', 'dist/js/app.js' )
      .then( function() {
          console.log( 'Bundling completed successfully' );
      } )
      .catch( function( err ) {
          console.error( '>>> [systemjs-builder] Bundling failed'.bold.green, err );
      } );
} );

// Concatenate and minify external vendor libraries...
gulp.task( 'libs', function() {

    gulp.src( [
      'node_modules/systemjs/dist/system.src.js'
    ] )
      .pipe( concat( 'libs.js' ) )
      .pipe( uglify() )
      .pipe( gulp.dest( 'dist/js' ) );
} );

gulp.task( 'css', function() {
    return gulp.src( './src/css/app.css' )
        .pipe( concat( 'css.css' ) )
        .pipe( gulp.dest( './dist/css' ) );
} );

// Copies index.html, replacing <script> and <link> tags to reference production URLs
gulp.task( 'html', function() {
    return gulp.src( './src/index.html' )
        .pipe( htmlreplace( {
            'css': 'css/css.css',
            'js': 'js/app.js',
            'libs': 'js/libs.js'
        } ) )
        .pipe( gulp.dest( './dist/' ) );
} );

// Removes all files from ./dist/
gulp.task( 'clean', function() {
    return gulp.src( './dist/**/*', { read: false } )
      .pipe( rimraf() );
} );

gulp.task( 'default', [ 'bundle', 'html', 'css'], function( callback ) {
    console.log( '\nPlaced optimized files in ' + chalk.magenta( 'dist/\n' ) );
    callback();
} );
