function firstAndLastKElements(arr) {
    let k = Number(arr.shift());
    console.log(arr.slice(0, k).join(' '));
    console.log(arr.slice(arr.length-k, arr.length).join(' '));
}

firstAndLastKElements(['2',
    '7', '8', '9']);
