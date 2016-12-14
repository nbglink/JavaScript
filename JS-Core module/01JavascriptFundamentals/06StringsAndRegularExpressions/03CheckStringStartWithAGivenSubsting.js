function solve(input) {
    let givenStr = input[0];
    let pattern = `${input[1]}`;
    let regex = new RegExp(pattern,'g');

    let result = regex.test(givenStr);





    console.log(result);

}

solve(["This sentence ends with fun?", "fun?"]);

solve(['This is Houston, we have…' , 'We have…']);

solve(['The new iPhone has no headphones jack.','o headphones jack.']);


