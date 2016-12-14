/*var myArray = [11,22,34,65,34];

let mySet = new Set(myArray);

mySet.add("100");
mySet.add({a:1, b:2});
mySet.delete(22);
//mySet.clear();
mySet.add("100");
mySet.add("200");

//console.log(mySet.size);

mySet.forEach(function (val) {
    console.log(val);
})*/



let myMap = new Map([['a1','Hello'], ['b2', 'Goodbye']]);

myMap.set('c3','foo');
myMap.delete('a1');


console.log(myMap.size);
console.log(myMap);

console.log(myMap.get('b2'));






