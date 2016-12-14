function solve(arr) {

    for(let i = 0; i < arr.length -1; i++){
        if(arr[i] == "Stop"){
            break;
        }
        console.log(arr[i]);
    }

}

solve(["3","6","5","4","Stop","10","20"])
