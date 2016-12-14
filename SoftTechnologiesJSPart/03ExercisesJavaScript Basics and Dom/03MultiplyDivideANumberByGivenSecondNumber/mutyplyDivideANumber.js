function solve(arr) {
    let N = Number(arr[0]);
    let X = Number(arr[1]);

    if (N <= X){
        console.log(N * X);
    }
    else{
       console.log (N / X);
    }


}
solve(['3', '2']);