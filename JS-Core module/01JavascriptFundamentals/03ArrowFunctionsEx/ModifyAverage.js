function average(input){

    let digits = input[0].split('').map(Number);

    let sum = digits.reduce((a,b) => a + b);

    while((sum/(digits.length))<=5){
        digits.push(9);
        sum+=9;
    }

    var number="";

    for(let i=0; i < digits.length; i++){
        number += digits[i];
    }

    console.log(number);
}


average(["101"]);