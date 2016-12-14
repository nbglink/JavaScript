function validityChecker([x1, y1, x2, y2]) {

    [x1, y1, x2, y2] = [x1, y1, x2, y2].map(Number);

    let x = Math.pow((x2-x1),2);
    let y = Math.pow((y2-y1),2);
    let x1ToZero = Math.pow((0-x1),2);
    let y1ToZero = Math.pow((0-y1),2);
    let x2ToZero = Math.pow((0-x2),2);
    let y2ToZero = Math.pow((0-y2),2);



    let fromFirstToZero = Math.sqrt(x1ToZero + y1ToZero);
    let fromSecondToZero = Math.sqrt(x2ToZero + y2ToZero)
    let betweenGivenPoints = Math.sqrt(x+y);


    if(fromFirstToZero % 1 !== 0){
        console.log(`{${x1}, ${y1}} to {0, 0} is invalid`);
    } else {
        console.log(`{${x1}, ${y1}} to {0, 0} is valid`);
    }

    if(fromSecondToZero % 1 !== 0){
        console.log(`{${x2}, ${y2}} to {0, 0} is invalid`);
    } else {
        console.log(`{${x2}, ${y2}} to {0, 0} is valid`);
    }

    if(betweenGivenPoints % 1 !== 0){
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`);
    } else {
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`);
    }
}


validityChecker(['3','0','0','4']);
validityChecker(['2','1','1','1']);