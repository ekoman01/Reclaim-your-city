// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: 50.82818419398026, lng: 3.257600642724414 };

  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.querySelector(".map_map"), {
    zoom: 13.5,
    center: position,
    mapId: "90161e24d64c70de",
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: false,
  });

  const markers = [
    [
      "Leie",

      50.83145828070634,
      3.2617208080111695,
      "../assets/svg/Leie.svg",
      55,
      55,
      "Meer info",
      "This is the center of Kortrijk",
    ],
    [
      "Skatebowl Albertpark",
      50.83405140950963,
      3.2702272150751317,
      "../assets/svg/rivier.svg",
      50,
      50,
      "Meer info",
    ],
    [
      "The Park Playground Kortrijk",
      50.8311625349146,
      3.288817227313192,
      "../assets/svg/rivier.svg",
      50,
      50,
      "Meer info",
    ],
    [
      "Blauwe Poortpark",
      50.816118340242575,
      3.2731448811987542,
      "../assets/svg/rivier.svg",
      50,
      50,
      "Meer info",
    ],
    [
      "Sportcentrum Ter Biezen",
      50.827641969603754,
      3.2322871508907745,
      "../assets/svg/rivier.svg",
      50,
      50,
      "Meer info",
    ],
    [
      "LAGO Swimming Pool Courtrai Lagaeplein",
      50.84510866179667,
      3.2359362023701395,
      "../assets/svg/rivier.svg",
      50,
      50,
      "Meer info",
    ],
    [
      "RING Kortrijk",
      50.846110787490694,
      3.2616622106388093,
      "../assets/svg/rivier.svg",
      50,
      50,
      "Meer info",
    ],
  ];
  const stops = [
    [
      "Karaokebar",
      50.8318258650976,
      3.2443914332018267,
      "../assets/svg/pin.svg",
      50,
      50,
      "Meer info",
    ],
    [
      "Hestia Houtatelier",
      50.82954818295903,
      3.2392984156658367,
      "../assets/svg/pin.svg",
      50,
      50,
      "Meer info",
    ],
    [
      "TEXTURE - Flax & River Lys Museum",
      50.83051890394925,
      3.2557554138642963,
      "../assets/svg/pin.svg",
      50,
      50,
      "Meer info",
    ],
  ];


  for (let i = 0; i < markers.length; i++) {
    const currMarker = markers[i];
    const currStop = stops[i];

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
      content: 
      currMarker[0] + "<br>" +
      currMarker[7] + "<br>" +
      "<button class='button-23' role='button'>" + currMarker[6] + "</button>",

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
    };

    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer(rendererOptions);
  
    directionsRenderer.setMap(map);
    let request = {
      origin: { lat: 50.82818419398026, lng: 3.257600642724414},
      destination: { lat: currMarker[1], lng: currMarker[2] },
      travelMode: google.maps.TravelMode.WALKING,

      
      
    };
    directionsService.route(request, function (result, status) {
      if (status == "OK") {
        directionsRenderer.setDirections(result);
      }
    }
    
    
    );

  }
  


}

initMap();