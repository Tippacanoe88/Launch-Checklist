// Require necessary modules if needed (for Node.js)
// const fetch = require('isomorphic-fetch');

// Helper functions
function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl, listedPlanets) {
    //Locating the missionTarget div using the document parameter
    const missionTargetDiv = document.getElementById('missionTarget');
    //This function populates the missionTarget div with info about the mission destination

    // HTML structure for mission target info
    missionTargetDiv.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}" alt="MISSION DESTINATION IMAGE">
    `;
}
//validateInput checks the input to see if its empty.
function validateInput(testInput) {
    if (testInput === '') {
        return 'Empty';
    } else if (isNaN(testInput)) {
        return 'Not a Number';
    } else {
        return 'Valid entry';
    }
}
/*formSubmission validates the form inputs using the validateInput*/
async function formSubmission(document, listedPlanets, pilot, copilot, fuelLevel, cargoLevel) {
    // Validate form inputs
    let pilotStatus = validateInput(pilot);
    let copilotStatus = validateInput(copilot);
    let fuelStatus = validateInput(fuelLevel);
    let cargoStatus = validateInput(cargoLevel);

    // ... (your form submission logic)
    const randomPlanet = pickPlanet(listedPlanets);
    const { name, diameter, star, distance, moons, imageURL } = randomPlanet;

    // Example of updating the DOM based on form submission results
    if (pilotStatus === 'Valid entry' &&
        copilotStatus === 'Valid entry' &&
        fuelStatus === 'Valid entry' &&
        cargoStatus === 'Valid entry'
    ) {
        addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl);
        document.getElementById('pilotStatus').innerHTML = `Pilot ${pilot} is ready for launch`;
        document.getElementById('copilotStatus').innerHTML = `Co-Pilot ${copilot} is ready for launch`;

        const fuelLevelValue = parseFloat(fuelLevel);

        if (fuelLevel < 10000) {
            document.getElementById('fuelStatus').innerHTML = 'Fuel level too low for launch';
        } else {
            document.getElementById('fuelStatus').innerHTML = 'Fuel level high enough for launch';
        }
        document.getElementById('launchStatus').innerHTML = 'Ready for launch';
    } else {
        document.getElementById('pilotStatus').innerHTML = `Pilot status: ${pilotStatus}`;
        document.getElementById('copilotStatus').innerHTML = `Co-pilot status: ${copilotStatus}`;
        document.getElementById('fuelStatus').innerHTML = `Fuel status: ${fuelStatus}`;
        document.getElementById('cargoStatus').innerHTML = `Cargo status: ${cargoStatus}`;

        document.getElementById('launchStatus').innerHTML = 'Awaiting Information Launch';
    }
}

async function myFetch() {
    const url = 'https://handlers.education.launchcode.org/static/planets.json';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}

function pickPlanet(listedPlanets) {
    const randomIndex = Math.floor(Math.random() * listedPlanets.length);
    return listedPlanets[randomIndex];
}

// Export functions for use in other files
module.exports = {
    addDestinationInfo,
    validateInput,
    formSubmission,
    myFetch,
    pickPlanet
};

// Event listener for form submission
document.addEventListener('DOMContentLoaded', async function () {
    const listedPlanets = await myFetch();
    
    const formSubmitButton = document.getElementById('formSubmit');
    formSubmitButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form from submitting

        // Retrieve form values and call formSubmission
        const pilotName = document.getElementById('pilotName').value;
        const copilotName = document.getElementById('copilotName').value;
        const fuelLevel = document.querySelector('input[name="fuelLevel"]').value;
        const cargoMass = document.querySelector('input[name="cargoMass"]').value;


        formSubmission(document, listedPlanets, pilotName, copilotName, fuelLevel, cargoMass);
    });
});