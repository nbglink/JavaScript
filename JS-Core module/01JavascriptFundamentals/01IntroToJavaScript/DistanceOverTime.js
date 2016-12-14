function solve([ a , b, c]) {
    a = Number(a);
    b = Number(b);
    c = Number(c);


    let V1 = a * 1000;
    let V2 = b * 1000;
    let T = c / 3600;

    let dist1 = V1 * T;
    let dist2 = V2 * T;

    let delta = Math.abs(dist1 - dist2);

    console.log(delta);

}

solve([11, 10, 120])