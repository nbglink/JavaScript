function extractTextFromParenthesis(text) {
    if (Array.isArray(text)){
        text = text[0];
    }
    let results = [];
    let rightPar = -1;
    while (true) {
        let leftPar = text.indexOf('(', rightPar + 1);
        if(leftPar == -1)
            break;
        rightPar = text.indexOf(')', leftPar + 1);
        if (rightPar == -1)
            break;
        let textInside = text.substring(leftPar + 1, rightPar);
        results.push(textInside);
    }
    return results.join(', ')

}

let result = extractTextFromParenthesis(['Rakiya (Bulgarian brandy) is home-made liquor (alcoholic drink).' +
    'It can be made of grapes, plums or other fruits (even apples).']);

console.log(result);