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
let algaeHealth = 92;


//=========================
// SYSTEM STATE
//=========================

let mistOn = false;
let mistInterval;
let fanOn = false;
let fanInterval;
let lightOn = false;
let lightInterval;
let pumpOn = false;

//=========================
// HTML ELEMENTS
//=========================

const airTempText = document.getElementById("airTemp");
const humidityText = document.getElementById("humidity");
const soilTempText = document.getElementById("soilTemp");
const soilMoistureText = document.getElementById("soilMoisture");
const waterLevelText = document.getElementById("waterLevel");
const algaeHealthText = document.getElementById("algaeHealth");

const mistBtn = document.getElementById("mistBtn");
const fanBtn = document.getElementById("fanBtn")
const lightBtn = document.getElementById("lightBtn")
const pumpBtn = document.getElementById("pumpBtn")

const IDEAL = {

    humidity: 80,

    airTemp: 24,

    soilMoisture: 75,

    waterLevel: 40,

    algaeHealth: 90

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
    algaeHealthText.textContent = algaeHealth.toFixed(0) + "%";

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

    algaeHealth += 0.05;

    airTemp += 0.03;

    }

    if(pumpOn){

    soilMoisture += 0.4;

    waterLevel -= 0.1;

    }

    humidity = Math.max(0, Math.min(100, humidity));

    soilMoisture = Math.max(0, Math.min(100, soilMoisture));

    waterLevel = Math.max(0, Math.min(100, waterLevel));

    algaeHealth = Math.max(0, Math.min(100, algaeHealth));

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

//PUMP

function turnPumpOn(){

    pumpOn = true;
    pumpBtn.textContent = "💧 Pump ON";

}

function turnPumpOff(){

    pumpOn = false;
    pumpBtn.textContent = "💧 Pump OFF";

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

//PUMP

pumpBtn.addEventListener("click",function(){

    if(!pumpOn){

        turnPumpOn();

    }
    else{

        turnPumpOff();

    }

});

//=========================
// AI
//=========================

function ecosystemAI(){

    if(humidity < 75){

    turnMistOn();

    }

    if(humidity > 90){

    turnMistOff();

    }

    if(airTemp > 28){

    turnFanOn();

    }

     if(airTemp < 24){

    turnFanOff();

    }

    if(soilMoisture < 65){

    turnPumpOn();

    }

    if(soilMoisture > 85){

    turnPumpOff();

    }

    if(waterLevel < 15){

    turnPumpOff();

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