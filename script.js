const {
    addDestinationInfo,
    pickPlanet,
    myFetch,
    formSubmission
} = require('./scriptHelper.js');

let listedPlanets;
let listedPlanetsResponse = myFetch(); // Fetching the list of planets using myFetch()

listedPlanetsResponse.then(function (result) {
    listedPlanets = result;

    // Call pickPlanet() to select a random planet from the list of planets
    const randomPlanet = pickPlanet(listedPlanets);

    // Extract necessary information for addDestinationInfo() from the selected random planet
    const { name, diameter, star, distance, moons, imageUrl } = randomPlanet;

    // Locate the missionTarget div using document and pass the information to addDestinationInfo()
    const missionTargetDiv = document.getElementById('missionTarget');
    addDestinationInfo(missionTargetDiv, name, diameter, star, distance, moons, imageUrl);

}).catch(function (error) {
    console.error('There was an error:', error);
});

    // Event listener for form submission
    const formSubmitButton = document.getElementById('formSubmit');
    formSubmitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form from submitting

        // Retrieve form values
        const pilotName = document.getElementById('pilotName').value;
        const copilotName = document.getElementsByName('copilotName')[0].value;
        const fuelLevel = document.querySelector('input[name="fuelLevel"]').value;
        const cargoMass = document.querySelector('input[name="cargoMass"]').value;

        // Call formSubmission() passing the form field values
        formSubmission(document, listedPlanets, pilotName, copilotName, fuelLevel, cargoMass);
    });