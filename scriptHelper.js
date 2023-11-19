require("cross-fetch/polyfill");

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
  let missionTarget = document.getElementById('missionTarget');
  missionTarget.innerHTML = `
      <h2>Mission Destination</h2>
      <ol>
          <li>Name: ${name}</li>
          <li>Diameter: ${diameter}</li>
          <li>Star: ${star}</li>
          <li>Distance from Earth: ${distance}</li>
          <li>Number of Moons: ${moons}</li>
      </ol>
      <img src="${imageUrl}">
  `;
}
//validateInput checks the input to see if its empty.
function validateInput(testInput) {
    if (testInput.trim === '') {
        return 'Empty';
    } else if (isNaN(testInput)) {
        return 'Not a Number';
    } else {
        return 'Valid entry';
    }
}
/*formSubmission validates the form inputs using the validateInput*/
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    let faultyItems = document.getElementById('faultyItems');
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    let launchStatus = document.getElementById('launchStatus');
  
    faultyItems.style.visibility = 'visible';
    pilotStatus.innerHTML = (`Pilot ${pilot} is ready for launch`);
    copilotStatus.innerHTML = (`Co-pilot ${copilot} is ready for launch`);
  
    if (fuelLevel < 10000) {
        fuelStatus.innerHTML = 'There is not enough fuel for the journey';
        launchStatus.innerHTML = 'Shuttle not ready for launch';
        launchStatus.style.color = 'red';
    } else {
        fuelStatus.innerHTML = 'Fuel level high enough for launch';
    }
  
    if (cargoMass > 10000) {
        cargoStatus.innerHTML = 'There is too much mass for the shuttle to take off';
        launchStatus.innerHTML = 'Shuttle not ready for launch';
        launchStatus.style.color = 'red';
    } else {
        cargoStatus.innerHTML = 'Cargo mass low enough for launch';
    }
  
    if (fuelLevel >= 10000 && cargoMass <= 10000) {
        launchStatus.innerHTML = 'Shuttle is ready for launch';
        launchStatus.style.color = 'green';
    }
  }

  async function myFetch() {
    let planetsReturned;
  
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Network response was not ok");
            }
        });
  
    return planetsReturned;
  }

// Export functions for use in other files
module.exports = {
    addDestinationInfo,
    validateInput,
    formSubmission,
    myFetch,
    pickPlanet
};