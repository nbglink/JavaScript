function solve(input) {

   let givenStr = input[0];
   let repTimes = input[1];
   let hArr = [];

    for (let i = 1; i <= repTimes; i++) {

        hArr.push(givenStr);

    }

    let joinedStr = hArr.join('');
    console.log(joinedStr);

}

solve(['repeat', '5']);



