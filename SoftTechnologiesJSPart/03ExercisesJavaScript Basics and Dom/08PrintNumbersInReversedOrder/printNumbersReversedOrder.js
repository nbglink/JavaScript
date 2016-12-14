function solve(arr){
    let numArr = [];
    let result = [];
    for(let i = 0; i< arr.length; i++){
        numArr.push(Number(arr[i]));
    }
    result = numArr.reverse(((a,b)=>a-b)).join('\n');

    console.log(result);

}

solve(["5","5.5","24","-3"])