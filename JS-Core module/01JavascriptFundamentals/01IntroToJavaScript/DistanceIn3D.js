
function solve([ x1 , y1, z1 , x2, y2, z2]) {
    x1 = Number(x1);
    y1 = Number(y1);
    z1 = Number(z1);
    x2 = Number(x2);
    y2 = Number(y2);
    z2 = Number(z2);

    let x = Math.pow((x2-x1),2);
    let y = Math.pow((y2-y1),2);
    let z = Math.pow((z2-z1),2);

    let dist = Math.sqrt(x + y + z);

    console.log(dist);

}

solve([1, 1, 0, 5, 4, 0])