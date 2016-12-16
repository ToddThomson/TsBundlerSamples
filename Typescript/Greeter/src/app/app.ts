import { Greeter } from "./Greeter";

function initializeApp() {
    var el = document.getElementById( 'content' );
    var greeter = new Greeter( el );
    
    greeter.start();    
}

if ( document.readyState === 'complete' ) {
    initializeApp();
} else {
    document.onreadystatechange = () => {
        if ( document.readyState === "complete" ) {
            initializeApp();
        }
    }
}
