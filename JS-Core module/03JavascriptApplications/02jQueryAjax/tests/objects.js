var prices = {'orange' : 2.30, 'apple': 1.50, 'tomato': 3.80};

for (key in prices){
    console.log(key + ' -> ' + prices[key]);
}

console.log(Object.keys(prices)); // ["orange", "apple", "tomato"]

var nums = [10,20,30];

console.log(Object.keys(nums)); // ["0","1","2"]

