// Node related
var fs = require( 'fs' ),
    vm = require( 'vm' ),
    merge = require( 'deeply' ),
    chalk = require( 'chalk' ),
    es = require( 'event-stream' );

// Gulp related
var gulp = require( 'gulp' ),
    concat = require( 'gulp-concat' ),
    rimraf = require( 'gulp-rimraf' ),
    replace = require( 'gulp-replace' ),
    uglify = require( 'gulp-uglify' ),
    htmlreplace = require( 'gulp-html-replace' ),
    rjs = require( 'gulp-requirejs' ),
    tsproject = require( "tsproject" ),
    tsb = require( 'tsbundler' );


var requireJsOptimizerConfig = {
    out: 'scripts.js',
    baseUrl: './app',
    name: 'src/bundles/app',
    paths: {
        "requireLib": 'bower_modules/requirejs/require',
        "classnames": "../node_modules/classnames/index",
        "eventemitter3": "../node_modules/eventemitter3/index",
        "react": "../node_modules/react/dist/react",
        "react-dom": "../node_modules/react-dom/dist/react-dom",
        "flux": "../node_modules/flux/dist/flux"
    },
    shim: {
        "react": { exports: "React" },
        "react-dom": { exports: "ReactDom" },
        "eventemitter3": { exports: "EventEmitter" }
    },
    include: ['requireLib'],
    insertRequire: ['src/bundles/app']
};

var bundlerOptions = {
    logLevel: 0,
    verbose: true
};

gulp.task( "ts", function() {
    var bundleBuilder = tsb.builder( "./app/src/tsconfig.json", bundlerOptions );

    return bundleBuilder.src()
        .pipe( gulp.dest( './' ) );

} );

gulp.task( 'js', ['ts'], function( callback ) {
    rjs( requireJsOptimizerConfig )
        .pipe( gulp.dest( './dist/' ) );

    callback();
} );

// Concatenates CSS files, rewrites relative paths to Bootstrap fonts, copies Bootstrap fonts
gulp.task( 'css', function() {
    var todoCss = gulp.src('node_modules/todomvc-app-css/index.css'),
        appCss = gulp.src('app/css/*.css');

    return s = es.concat(todoCss, appCss).pipe(concat('css.css'))
        .pipe(gulp.dest('./dist/'));
} );

// Copies index.html, replacing <script> and <link> tags to reference production URLs
gulp.task( 'html', function() {
    return gulp.src( './app/index.html' )
        .pipe( htmlreplace( {
            'css': 'css.css',
            'js': 'scripts.js'
        } ) )
        .pipe( gulp.dest( './dist/' ) );
} );

// Removes all files from ./dist/
gulp.task( 'clean', function() {
    return gulp.src( './dist/**/*', { read: false } )
      .pipe( rimraf() );
} );

gulp.task( 'default', ['html', 'js', 'css'], function( callback ) {
    console.log( '\nPlaced optimized files in ' + chalk.magenta( 'dist/\n' ) );
    callback();
} );
