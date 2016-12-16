( function( global ) {
    System.config( {
        // map tells the System loader where to look for things
        map: {
            // our app is within the js folder
            app: 'js'
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