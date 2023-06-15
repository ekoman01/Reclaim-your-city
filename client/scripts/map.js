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
  map = new Map(document.querySelector(".map"), {
    zoom: 13.5,
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
    ],
    [
      "Skatebowl Albertpark",
      50.83409970760863,
      3.270293270215407,
      "../assets/svg/rivier.svg",
      50,
      50,
      "Meer info",
      "Broel",
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
    ],
    [
      "Koningin Astridpark",
      50.834324539045305,
      3.2583107413794417,
      "../assets/svg/rivier.svg",
      50,
      50,
      "Meer info",
      "Buda",
    ],
    [
      "TEXTURE - Flax & River Lys Museum",
      50.83051890394925,
      3.2557554138642963,
      "../assets/svg/rivier.svg",
      50,
      50,
      "Meer info",
      "Buda",
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
      content:
        currMarker[0] +
        "<br>" +
        currMarker[7] +
        "<br>" +
        "<button class='button-23' role='button'>" +
        currMarker[6] +
        "</button>",
    });

    let buttons = document.querySelectorAll("button-23");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        window.location.href =
          "https://www.google.com/maps/dir/?api=1&origin=50.82818419398026,3.257600642724414&destination=" +
          currMarker[1] +
          "," +
          currMarker[2] +
          "&travelmode=walking";
      });
    });

    Marker.addListener("click", () => {
      infoWindow.open(map, Marker);
    });

    let rendererOptions = {
      suppressMarkers: true,
    };

    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer(
      rendererOptions
    );

    directionsRenderer.setMap(map);
    let request;
    if (currMarker[7] == "Broel") {
      request = {
        origin: { lat: 50.82818419398026, lng: 3.257600642724414 },
        destination: { lat: currMarker[1], lng: currMarker[2] },
        travelMode: google.maps.TravelMode.WALKING,
      };
    } else if (currMarker[7] == "Noord") {
      request = {
        origin: { lat: 50.82961740466221, lng: 3.2562487125431767 },
        destination: { lat: currMarker[1], lng: currMarker[2] },
        travelMode: google.maps.TravelMode.WALKING,
      };
    } else if (currMarker[7] == "Buda") {
      request = {
        //50.83145913829007, 3.261705862452918,
        origin: { lat: 50.83145913829007, lng: 3.261705862452918 },
        destination: { lat: currMarker[1], lng: currMarker[2] },
        travelMode: google.maps.TravelMode.WALKING,
      };
    }

    directionsService.route(request, function (result, status) {
      if (status == "OK") {
        directionsRenderer.setDirections(result);
      }
    });
  }
}

initMap();
