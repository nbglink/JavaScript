function solve(input) {
    let givenStr = input[0];
    let delimiter = input[1];

    console.log(givenStr.split(delimiter).join("\n"));
}

solve(['One-Two-Three-Four-Five', '-']);
solve(['http://platform.softuni.bg','.']);