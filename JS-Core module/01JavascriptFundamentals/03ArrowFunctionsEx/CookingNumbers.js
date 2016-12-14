function solve(input) {
    let theNumber = Number(input[0]);

    for (let i = 1; i < input.length; i++) {
        let command = input[i];

        switch (command) {
            case 'chop':
                theNumber = theNumber / 2;
                break;
            case 'dice':
                theNumber = Math.sqrt(theNumber);
                break;
            case 'spice':
                theNumber = theNumber + 1;
                break;
            case 'bake':
                theNumber = theNumber * 3;
                break;
            case 'fillet':
                theNumber = theNumber - (0.2 * theNumber);
               break;
        }

        console.log(theNumber);
    }
}

solve(["32", "chop", "chop", "chop", "chop", "chop"]);
solve(["9", "dice", "spice", "chop", "bake", "fillet"]);