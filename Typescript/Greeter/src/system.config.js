( function( global ) {
    System.config( {
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // The folder where app.js exists. Use 'app/bundler' for the bundled typescript module.
            app: 'app'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: 'app',
                defaultExtension: 'js'
            }
        }
    } );
} )( this );