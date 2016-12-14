function solve(arr) {

    let result = [];
    let multipleKeys = [];
    for (let i = 0; i < arr.length - 1; i++) {
        let key = arr[i].split(' ')[0];
        let value = arr[i].split(' ')[1];
        result[key] = value;

        let targetKey = arr[arr.length - 1];


        multipleKeys.push(result[targetKey]);


    }

    for (let j = 0; j < multipleKeys.length; j++) {
        if (multipleKeys[j] == multipleKeys[j - 1]) {
            multipleKeys.splice(j, 1);
        }
        else if (multipleKeys[multipleKeys.length - j - 1] == undefined) {
            multipleKeys.shift();

        }

    }

    if (multipleKeys[0] == undefined) {
        console.log("None");
    }
    else {

        console.log(multipleKeys.join('\n'));
    }
}

solve(['3 test', '3 test1', '4 test2', '4 test3', '4 test5', '4']);

//solve(['3 alb', '3 bla', '2']);
