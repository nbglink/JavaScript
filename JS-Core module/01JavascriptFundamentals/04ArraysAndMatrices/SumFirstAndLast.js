function sumFirstAndLast(arr) {

    arr.slice(1,2);

    return arr.reduce((a, b) => Number(a) + Number(b));
}

console.log(sumFirstAndLast(['20', '30', '40']));