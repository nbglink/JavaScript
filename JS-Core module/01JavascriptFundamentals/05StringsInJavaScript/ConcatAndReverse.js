function concatAndReverse(arr) {
    let allStrings = arr.join('');
    let chars = Array.from(allStrings);
    let revChars = chars.reverse();
    let revStr = revChars.join('');
    return revStr;
}

let result = concatAndReverse(['I', 'am', 'student']);

console.log(result);