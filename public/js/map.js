mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: "map", // container ID
    center: coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

const marker = new mapboxgl.Marker({color: "red"})
    .setLngLat(coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
            .setHTML(`<h5>${loc}</h5><p>Exact location will be provided after booking</p>`)
    )
    .addTo(map);