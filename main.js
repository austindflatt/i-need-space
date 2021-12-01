const button = document.querySelector('#search');
const information = document.querySelector('#information');

button.addEventListener('click', function() {
    // when search button is clicked function runs
    myFunction();
});

// async await promise syntax
// Get data from Mapbox API
async function makeHttpRequest(url){
    const httpResponse = await fetch(url);
    const data = await httpResponse.json();
    return data;
};

// Get data from Satellite Passes API
async function makeHttpRequest2(url){
    const httpResponse = await fetch(url);
    const satelliteData = await httpResponse.json();
    return satelliteData;
};

async function myFunction() {
    const apiInput = document.querySelector('#api-key').value;
    const addressInput = document.querySelector('#address').value.toUpperCase();
    const noradInput = document.querySelector('#norad').value;
    // Mapbox API
    const data = await makeHttpRequest(`https://api.mapbox.com/geocoding/v5/mapbox.places/${addressInput}.json?access_token=${apiInput}`);
    const longitude = data.features[0].center[0];
    const latitude = data.features[0].center[1];
    console.log(longitude);
    console.log(latitude);
    // Satellite Passes API
    const satelliteApi = await makeHttpRequest2(`https://satellites.fly.dev/passes/${noradInput}?lat=${latitude}&lon=${longitude}&limit=1&days=15&visible_only=true`);
    const rise = satelliteApi[0].rise.utc_datetime;
    const culminate = satelliteApi[0].culmination.utc_datetime;
    const set = satelliteApi[0].set.utc_datetime;
    console.log(rise);
    console.log(culminate);
    console.log(set);
    const getInfo = document.createElement('div');
    getInfo.innerHTML = `
    <div class="row">
        <h2><span class="address">${addressInput}</span></h2>
    </div>
    <div class="row">
        <h2>Longitude:</h2>
    </div>
    <div class="row">
        <p>${longitude}</p>
    </div>
    <div class="row">
        <h2>Latitude:</h2>
    </div>
    <div class="row">
        <p>${latitude}</p>
    </div>
    <div class="row">
        <h2><span class="address">${addressInput}</span> Rise Time:</h2>
    </div>
    <div class="row">
        <p>${rise}</p>
    </div>
    <div class="row">
        <h2><span class="address">${addressInput}</span> Culmination Time:</h2>
    </div>
    <div class="row">
        <p>${culminate}</p>
    </div>
    <div class="row">
        <h2><span class="address">${addressInput}</span> Set Time:</h2>
    </div>
    <div class="row">
        <p>${set}</p>
    </div>
    `;
    information.append(getInfo);
};