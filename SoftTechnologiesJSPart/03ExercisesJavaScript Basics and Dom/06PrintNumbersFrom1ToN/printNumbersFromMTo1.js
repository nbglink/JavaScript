function solve(arr) {
    let n = Number(arr[0]);

    let revArr = [];

    for(let i = 1; i <= n; i++){
        revArr.push(i);
    }

    let result = revArr.reverse(((a , b) => a - b));

    console.log(result.join("\n"))


}

solve(["10"])