function solve([binary]){
    //binary = Number(binary);

    //var result = parseInt(binary, 2);

    let result = 0;

    if(binary[7] == 1){
        result+= 1;
    }

    if(binary[6] == 1){
        result+= 2;
    }

    if(binary[5] == 1){
        result+= 4;
    }

    if(binary[4] == 1){
        result+= 8;
    }

    if(binary[3] == 1){
        result+= 16;
    }

    if(binary[2] == 1){
        result+= 32;
    }

    if(binary[1] == 1){
        result+= 64;
    }

    if(binary[0] == 1){
        result+= 128;
    }




    console.log(result);

}

solve(['00001001']);