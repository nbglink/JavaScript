function solve(arr) {

    let num1 = Number(arr[0]);
    let num2 = Number(arr[1]);
    let num3 = Number(arr[2]);


    if ((num1 && num2 > 0) && (num3 < 0)){
        console.log("Negative");
    }
    else if ((num1 && num2 < 0) && (num3 > 0)){
        console.log("Positive");
    }
    else if ((num1 && num2 < 0) && (num3 < 0)){
        console.log("Negative");
    }
    else if ((num1 || num2  || num3 == 0)){
        console.log("Positive");
    }


}
solve(["-5","-4", "0"])