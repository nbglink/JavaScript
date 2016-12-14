function main(input){
    let bombBunnies = input.pop().split(" ");

    let matrix = [];

    let snowballDamage = 0;
    let snowballKills = 0;

    function isInMatrix(matrix, row, column) {
        if((row >= 0 && row < matrix.length)
            && (column >= 0 && column < matrix[row].length)){
            return true;
        }
        return false;
    }

    function explode(matrix, bombRow, bombColumn, bombDamage) {
        for (let row = bombRow - 1; row <= bombRow + 1;  row++) {
            for (let col = bombColumn - 1; col <= bombColumn + 1; col++) {
                if (isInMatrix(matrix, row, col)) {
                    matrix[row][col] = matrix[row][col] - bombDamage;
                }

            }

        }

        return matrix;

    }

    for (let i = 0; i < input.length; i++) {
        let currentRow = input[i].split(" ")
            .map((x) => Number(x));

        matrix.push(currentRow);

    }

    for(let i = 0; i < bombBunnies.length; i++) {
        let currentBombBunny = bombBunnies[i].split(",")
            .map((x) => Number(x));

        let bombRow = currentBombBunny[0];
        let bombColumn = currentBombBunny[1];


        let bombDamage =  matrix[bombRow][bombColumn];


        if(bombDamage > 0) {
            snowballDamage += bombDamage;
            snowballKills++;

           matrix = explode(matrix, bombRow, bombColumn, bombDamage);
        }
    }


    for(let row = 0; row < matrix.length; row++){
        for (let column = 0; column < matrix[row].length; column++){
            let currentCell = matrix[row][column];

            if(currentCell > 0){
                snowballDamage += currentCell;
                snowballKills++;
            }

        }
    }

    console.log(snowballDamage);
    console.log(snowballKills);
}

let arr = [
    "5 10 15 20",
    "10 10 10 10",
    "10 15 10 10",
    "10 10 10 10",
    "2,2 0,1"

];

main(arr);