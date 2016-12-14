function solve ([inches]){

    inches = Number(inches);

    let feet = Math.floor(inches/12);

    let inchesInFeet = String(inches/12);

    let inchesFromFeet = 0;

    if (inches % 12 > 0){

        inchesFromFeet = "0." + inchesInFeet.substr(inchesInFeet.indexOf(".") + 1);
    }

    let feetSeconds = Math.round(inchesFromFeet * 12)

    let result = feet + "\'-" + feetSeconds + "\""

    console.log(result);

}

solve([11]);