function solve(arr) {
    let N = Number(arr[0]);
    let result = [];
    for(let i = 1; i < arr.length; i++){
        let key = arr[i].split(" - ")[0];
        let value = arr[i].split(" - ")[1];

        result[key] =  value;
    }

    for (let j = 0; j < N; j++) {
        if(result[j] == undefined){
            console.log("0");
        }
        else{
            console.log(result[j])
        }

    }


}

solve(["5","0 – 3","3 – -1","4 – 2"]);