// Initialize and add the map
let map;

async function initMap() {
  // The location of 50.83056311268548, 3.2633354880559464
  const position = { lat: 50.83056311268548, lng: 3.2633354880559464 };

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.querySelector(".map_map"), {
    zoom: 15.4,
    center: position,
    mapId: "90161e24d64c70de",
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: false,
  });
  // Initialize and add the map

  const markers = [
    [
      "Broeltorens",
      50.83075963083195,
      3.2668384530194103,
      "../assets/svg/Leie.svg",
      50,
      50,
      "Meer info",
      "Broel",
      "The Broeltowers are two towers in the city of Kortrijk and are located along the Broelkaai and Verzetskaai. Both of the towers as well as the brige date back to the middle ages and are a protected monument.",
    ],
    [
      "K in Kortrijk",
      50.826837541580886,
      3.270410608119002,
      "../assets/svg/rivier.svg",
      50,
      50,
      "Meer info",
      "Broel",
      "A place where fashion, free time, interior, the catering industry and so much more come together.",
    ],
    [
      "Begijnhof",
      50.82925017889234,
      3.269520684593435,
      "../assets/svg/rivier.svg",
      50,
      50,
      "Meer info",
      "Broel",
      "The Begijnhof in Kortrijk was founded in 1238 by Johanna of Constantinopel.",
    ],
    [
      "Skatebowl <br> Albertpark",
      50.83409970760863,
      3.270293270215407,
      "../assets/svg/rivier.svg",
      50,
      50,
      "Meer info",
      "Broel",
      "The skatebowl in Kortrijk is the very first skate bowl worthy of it’s name. This ‘concretepark’ was built by Team Pain.",
    ],
    [
      "NoordBrug",
      50.82961740466221,
      3.2562487125431767,
      "../assets/svg/Leie.svg",
      50,
      50,
      "Meer info",
      "Noord",
      "The Noordbrug is located in the center of Kortrijk. It was named after the adjacent Noordrstaat. The bridge spans across the Leie and connects the Beheerstraat with the Noordstraat.",
    ],
    [
      "Kortrijk Weide",
      50.82475745071984,
      3.2510876451571233,
      "../assets/svg/rivier.svg",
      50,
      50,
      "Meer info",
      "Noord",
      "Kortrijk Weide is the new part of the city where multiple functions come together. The Nelson Mandelaplein is a events square that can accommodate no fewer than 15,000 spectators.",
    ],
    [
      "Buda brug",
      50.83145913829007,
      3.261705862452918,
      "../assets/svg/Leie.svg",
      50,
      50,
      "Meer info",
      "Buda",
      "This bridge was built in 2015 by the architectbureau ZJA. The bridge crosses the Leie. It is used by inhabitants and visitors of Kortrijk to travel to the Buda island.",
    ],
    [
      "Koningin <br> Astridpark",
      50.834324539045305,
      3.2583107413794417,
      "../assets/svg/rivier.svg",
      50,
      50,
      "Meer info",
      "Buda",
      "The park was named after the Queen Astrid who visited the park on the 5th of April in 1935.",
    ],
    [
      "Texture Museum",
      50.83051890394925,
      3.2557554138642963,
      "../assets/svg/rivier.svg",
      50,
      50,
      "Meer info",
      "Buda",
      "The museum is open from 10 to 17 o’ clock on Monday's en on holidays (24/12, 25/12, 31/12, 1/01)",
    ],
  ];
  


  for (let i = 0; i < markers.length; i++) {
    const currMarker = markers[i];

    const Marker = new google.maps.Marker({
      map: map,
      position: { lat: currMarker[1], lng: currMarker[2] },
      title: currMarker[0],

      icon: {
        url: currMarker[3],
        scaledSize: new google.maps.Size(currMarker[4], currMarker[5]),
      },
      Animation: google.maps.Animation.DROP,
      /*
      waypoints: [
        {
          position: { lat: currStop[1], lng: currStop[2] },
          stopover: true,
          
        },
      ],
      */

    });

    const infoWindow = new google.maps.InfoWindow({
      maxWidth: 250,
      content:
        "<div class='marked'>" +
        "<p>" +
        currMarker[0] +
        "</p>" +
        "<p>" +
        currMarker[8] +
        "</p>" +
        "<button class='markbutton' role='button'>" +
        currMarker[6] +
        "</button>",
    });
    
    let buttons = document.querySelectorAll("button-23");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        window.location.href = "https://www.google.com/maps/dir/?api=1&origin=50.82818419398026,3.257600642724414&destination=" + currMarker[1] + "," + currMarker[2] + "&travelmode=walking";
      });
    });


    Marker.addListener("click", () => {
      infoWindow.open(map, Marker);
    });


    let rendererOptions = {
      suppressMarkers: true,
      preserveViewport: true, //zoom level behouden
      polylineOptions: {
        strokeColor: "#EBB656",
        strokeOpacity: 0.8,
        strokeWeight: 4,
      },
    };

    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer(rendererOptions);
  
    directionsRenderer.setMap(map);
    let request;
    if (currMarker[7] == "Broel") {
      request = {
        //50.83076640730554, 3.2669242837072394
        origin: { lat: 50.83076640730554, lng: 3.2669242837072394},
        destination: { lat: currMarker[1], lng: currMarker[2] },
        travelMode: google.maps.TravelMode.WALKING,
      
      };
    }
    else if (currMarker[7] == "Noord") {
      request = {
      
        origin: { lat: 50.82961740466221, lng: 3.2562487125431767},
        destination: { lat: currMarker[1], lng: currMarker[2] },
        travelMode: google.maps.TravelMode.WALKING,
     
      };
    }
    else if (currMarker[7] == "Buda") {
      request = {
      
        //50.83145913829007, 3.261705862452918,
        origin: { lat: 50.83145913829007, lng: 3.261705862452918},
        destination: { lat: currMarker[1], lng: currMarker[2] },
        travelMode: google.maps.TravelMode.WALKING,
  
        
        
      };
      
    }
    
    directionsService.route(request, function (result, status) {
      if (status == "OK") {
        directionsRenderer.setDirections(result);
      }
    }
    
    
    );

  }
  


}

initMap();