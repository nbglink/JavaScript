const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_Hk0wdHiGx";
const kinveyAppSecret =
    "42331822cbd048cea3fe020c1ad033da";
const kinveyAppAuthHeaders = {
    'Authorization': "Basic " +
    btoa(kinveyAppKey + ":" + kinveyAppSecret),
};