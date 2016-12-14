function solve ([num, n]) {

    [num, n] = [num, n].map(Number);

    if(n > 15) n = 15;

    var denominator = Math.pow(10,n);


    var secondVar = Math.round(num * denominator) / denominator;

    console.log(secondVar);

}

solve([4.6456456, 123])