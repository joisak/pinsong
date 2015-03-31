var map;



function drawMap(latitude, longitude) {

    // Plasera markör där besökaren är just nu.
    var screen = new google.maps.LatLng(latitude, longitude);

    // Google Map Inställningar
    var mapOptions = {
        center: screen,
        zoom: 15,
        scaleControl: false,
        scrollwheel: true,
        draggable: true,
        streetViewControl: false,
        mapTypeControl: false,
        scaleControl: false,
        zoomControl: false,
        panControl: true
    };

    // Hämta ut kartan i ett objekt för att kunna placera ut markören.
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    
    // "Du är här!" markörens HTML innehåll.
    var markerContent = '<div><h2>You are here!</h2><p>Lorem ipsum dolor sit amet,<br/>consectetur adipiscing elit.<br/>Aliquam vitae arcu enim.<br/>Sed interdum vel<br/>ex eu tristique.<br/><br/><input type="button" value="Check in song"/></p><img src="img/user/jocke.jpg"></div>';
    
    // Placera ut "Du är här" markören!
    placeMarker(latitude, longitude, markerContent, true); 


        // "Exemepel incheckningar, detta ska ju hämtas från databas
        var checkinContent = '<div><h3>Dennis checked in Avicii - The Days</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/>Aliquam vitae arcu enim. Sed interdum vel ex eu tristique. Integer ut consequat ante.</p><iframe src="https://embed.spotify.com/?uri=spotify%3Atrack%3A4th1RQAelzqgY7wL53UGQt" width="300" height="80" frameborder="0" allowtransparency="true"></iframe></div>';

        // Placera ut exempel markören!
        placeMarker(57.718982, 11.947221, checkinContent, false);     
        placeMarker(57.714959, 11.947156, checkinContent, false);
        placeMarker(57.698680, 11.956855, checkinContent, false);
        placeMarker(57.702441, 11.960975, checkinContent, false);
        placeMarker(57.698497, 11.977197, checkinContent, false);
        placeMarker(57.692350, 11.950075, checkinContent, false);
    

}

google.maps.event.addDomListener(window, 'load', initialize);


function placeMarker(latitude, longitude, content, showForInit){

    // Markörens Inställningar. Lägg in markörens html i objektet.
    var markerOptions = new google.maps.InfoWindow({
        content: content
    });

    var marker;

    if(showForInit){
        // Skapa markören som ett objekt.
        marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude), // Placeringen för markören. Hämtat från besökaren.
        map: map,
    });
    }else{
        // Skapa markören som ett objekt.
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude), // Placeringen för markören. Hämtat från besökaren.
        map: map, // Ange vilken karta som markören ska placeras ut på. Vi har bara en karta så detta är enkelt. :),
        icon: 'img/user/dennis.jpg'
    });

    }

    
    if(showForInit){
        // Öppna Markören
            markerOptions.open(map, marker);
        }

        // skapa ett event som lyssnar på om användaren klickar på markören. Då ska HTML boxen visas!
        google.maps.event.addListener(marker, 'click', function () {
                markerOptions.open(map, marker);
                    });
    }




// funktion för att hämta besökarens position
function initialize(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    } else {
        // Fixa snyggare felmeddelande.
        alert("Geolocation is not supported by this browser.");
    }       
}

function getPosition(position) {
    drawMap(position.coords.latitude, position.coords.longitude);
}