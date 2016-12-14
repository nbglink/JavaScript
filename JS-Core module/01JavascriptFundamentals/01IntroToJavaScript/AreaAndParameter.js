function solve([ a , b]) {
    a = Number(a);
    b = Number(b);

    let area = (a * b);
    let perimeter = (2*(a + b));

    console.log(area.toFixed(2));
    console.log(perimeter.toFixed(2));

}

console.log(solve([2.5,3.14]));
