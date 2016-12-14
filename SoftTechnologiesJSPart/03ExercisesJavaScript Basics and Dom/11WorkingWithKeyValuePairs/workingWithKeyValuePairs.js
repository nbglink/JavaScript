function solve(arr) {

    let result = [];
    for (let i = 0; i < arr.length - 1; i++) {
        let key = arr[i].split(' ')[0];
        let value = arr[i].split(' ')[1];
        result[key] = value;
    }

    let targetKey = arr[arr.length - 1];
    if (result[targetKey] == undefined) {
        console.log("None");
    } else {
        console.log(result[targetKey]);
    }

}

solve(['key value', 'key eulav', 'test test', 'key']);
