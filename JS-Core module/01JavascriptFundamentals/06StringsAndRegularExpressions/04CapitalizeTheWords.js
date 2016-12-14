// function solve([input]) {
//
//     let pattern = /(\b\w)([\w\d]+)/g;
//     let splitedArr = input.split(' ');
//     let result = [];
//
//     for (let i = 0; i < splitedArr.length; i++) {
//
//         let bothGroups = pattern.exec(input);
//
//         let firstLetter = bothGroups[1].toUpperCase();
//         let secondPart = bothGroups[2].toLowerCase();
//
//         result.push(firstLetter + secondPart);
//     }
//
//     console.log(result.join(' '));
// }

function solve([input]) {
    let convertToLower = input.replace(/\w+/g, lower)
    let result = convertToLower.replace(/\b\w/g, upper);
    console.log(result);

    function lower(input) {
        return input.toLowerCase();
    }
    function upper(input) {
        return input.toUpperCase();
    }
}

solve(['Capitalize these WoRds']);
solve(['Was that Easy? tRY thIs onE for SiZe!']);


