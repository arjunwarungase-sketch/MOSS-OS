"use strict";

//=========================
// SENSOR VALUES
//=========================

let airTemp = 37;
let humidity = 45;
let soilTemp = 76;
let soilMoisture = 81;
let waterLevel = 50;
let airQuality = 20;
let ecosystemHealth = 92;


//=========================
// SYSTEM STATE
//=========================

let mistOn = false;
let mistInterval;
let fanOn = false;
let fanInterval;
let lightOn = false;
let lightInterval;
let dripperOn = false;

//=========================
// HTML ELEMENTS
//=========================

const airTempText = document.getElementById("airTemp");
const humidityText = document.getElementById("humidity");
const soilTempText = document.getElementById("soilTemp");
const soilMoistureText = document.getElementById("soilMoisture");
const waterLevelText = document.getElementById("waterLevel");
const ecosystemHealthText = document.getElementById("ecosystemHealth");

const mistBtn = document.getElementById("mistBtn");
const fanBtn = document.getElementById("fanBtn")
const lightBtn = document.getElementById("lightBtn")
const dripperBtn = document.getElementById("dripperBtn")

const IDEAL = {

    humidity: 80,

    airTemp: 22,

    soilMoisture: 75,

    waterLevel: 40,

    ecosystemHealth: 90

}

//=========================
// FUNCTIONS
//=========================

//DASHBOARD

function updateDashboard(){

    airTempText.textContent = airTemp.toFixed(1) + "°C";
    humidityText.textContent = humidity.toFixed(1) + "%";
    soilTempText.textContent = soilTemp.toFixed(1) + "°C";
    soilMoistureText.textContent = soilMoisture.toFixed(1) + "%";
    waterLevelText.textContent = waterLevel.toFixed(1) + "%";
    ecosystemHealthText.textContent = ecosystemHealth.toFixed(0) + "%";

}

//Nature

function simulateEnvironment(){

    // Air slowly warms back up
    if(airTemp < 27){
        airTemp += 0.02;
    }

    // Humidity slowly falls
    if(humidity > 40){
        humidity -= 0.05;
    }

    // Soil slowly dries
    if(soilMoisture > 50){
        soilMoisture -= 0.02;
    }

    // Water slowly evaporates
    if(waterLevel > 0){
        waterLevel -= 0.002;
    }

    if(mistOn){

    humidity += 1.5;

    airTemp -= 0.1; 

    soilMoisture += 0.1;

    }

    if(fanOn){

    humidity -= 0.3;

    airTemp -= 0.15;

    }

    if(lightOn){

    ecosystemHealth += 0.05;

    airTemp += 0.03;

    }

    if(dripperOn){

    soilMoisture += 0.4;

    waterLevel -= 0.1;

    }

    humidity = Math.max(0, Math.min(100, humidity));

    soilMoisture = Math.max(0, Math.min(100, soilMoisture));

    waterLevel = Math.max(0, Math.min(100, waterLevel));

    ecosystemHealth = Math.max(0, Math.min(100, ecosystemHealth));

}

//MIST

function turnMistOn(){

    mistOn = true;
    mistBtn.textContent = "🌫 Mist ON";
}

function turnMistOff(){

    mistOn = false;
    mistBtn.textContent = "🌫 Mist OFF";

}

//FAN

function turnFanOn(){

    fanOn = true;
    fanBtn.textContent = "🌬 Fan ON";

}

function turnFanOff(){

    fanOn = false;
    fanBtn.textContent = "🌬 Fan OFF";

}

//LIGHTS

function turnLightOn(){

    lightOn = true;
    lightBtn.textContent = "💡 Light ON";

}

function turnLightOff(){

    lightOn = false;
    lightBtn.textContent = "💡 Light OFF";

}

//DRIPPER

function turnDripperOn(){

    dripperOn = true;
    dripperBtn.textContent = "💧 Irrigation ON";

}

function turnDripperOff(){

    dripperOn = false;
    dripperBtn.textContent = "💧 Irrigation OFF";

}
//=========================
// BUTTONS
//=========================

//MIST

mistBtn.addEventListener("click",function(){

    if(!mistOn){

        turnMistOn();

    }
    else{

        turnMistOff();

    }

});

//FAN

fanBtn.addEventListener("click",function(){

    if(!fanOn){

        turnFanOn();

    }
    else{

        turnFanOff();

    }

});

//LIGHTS

lightBtn.addEventListener("click",function(){

    if(!lightOn){

        turnLightOn();

    }
    else{

        turnLightOff();

    }

});

//DRIPPER

dripperBtn.addEventListener("click",function(){

    if(!dripperOn){

        turnDripperOn();

    }
    else{

        turnDripperOff();

    }

});

//=========================
// AI
//=========================

function ecosystemAI(){

    if(humidity < IDEAL.humidity - 5){

    turnMistOn();

    }

    if(humidity > IDEAL.humidity + 10){

    turnMistOff();

    }

    if(airTemp > IDEAL.airTemp + 2){

    turnFanOn();

    }

     if(airTemp < IDEAL.airTemp - 2){

    turnFanOff();

    }

    if(soilMoisture < IDEAL.soilMoisture - 10){

    turnDripperOn();

    }

    if(soilMoisture > IDEAL.soilMoisture + 10){

    turnDripperOff();

    }

    if(waterLevel < IDEAL.waterLevel - 10){

    turnDripperOff();

    turnMistOff();

    }

}

//---------------------------
//MAIN LOOP
//---------------------------

updateDashboard();

setInterval(function(){

    simulateEnvironment();
    ecosystemAI();
    updateDashboard();

},1000);