window.addEventListener("load", function () {
    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse
        .then(function (result) {
            listedPlanets = result;
            // console.log(listedPlanets);
        })
        .then(function () {
            // Here we pick a planet at random and add the information to the destination
            let planet = pickPlanet(listedPlanets);
            addDestinationInfo(
                document,
                planet.name,
                planet.diameter,
                planet.star,
                planet.distance,
                planet.moons,
                planet.image
            );
        });

    let form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let pilotName = form.querySelector("input[name=pilotName]").value;
        let copilotName = form.querySelector("input[name=copilotName]").value;
        let fuelLevel = form.querySelector("input[name=fuelLevel]").value;
        let cargoMass = form.querySelector("input[name=cargoMass]").value;

        if (
            validateInput(pilotName) === "Empty" ||
            validateInput(copilotName) === "Empty" ||
            validateInput(fuelLevel) === "Empty" ||
            validateInput(cargoMass) === "Empty"
        ) {
            alert("All fields are required!");
        } else if (
            validateInput(pilotName) === "Is a Number" ||
            validateInput(copilotName) === "Is a Number" ||
            validateInput(fuelLevel) === "Not a Number" ||
            validateInput(cargoMass) === "Not a Number"
        ) {
            alert("Make sure to enter valid information for each field!");
        } else {
            formSubmission(
                document,
                null,
                pilotName,
                copilotName,
                fuelLevel,
                cargoMass
            );
        }
    });
});
