function solve(arr) {


    let results = [];

    for (let i = 0; i < arr.length; i++) {

        let cmd = arr[i].split(' ')[0];
        let arg = arr[i].split(' ')[1];

        if (cmd == "add") {
            results.push(arg);
        }
        if (cmd == "remove") {
            results.splice(arg, 1);
        }
    }

    console.log(results.join('\n'));


}

solve(["add 3", "add 5", "remove 1", "add 2"]);