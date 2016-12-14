function solve(input) {

    let digits = input.map((x) => Number(x));

    for (let i = 0; i < input.length; i++) {
        let digit = input[i];

        if (digit >= 0 && digit < 10) {



            for (let j = i; j < digits.length; j++) {

                console.log(digits[j]);

            }
        }

    }



}


solve(['10', '20', '2', '30', '44', '3', '56', '20', '24']);
//solve([ '100', '200', '2', '3', '2', '3', '2', '1', '1' ]);


