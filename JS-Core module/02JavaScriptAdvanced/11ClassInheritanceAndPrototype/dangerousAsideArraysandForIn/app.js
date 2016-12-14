Array.prototype.myCustomFeature = 'cool';


let arr = ['John', 'Jane', 'Jim'];

for (let prop in arr) {
    console.log(prop + ': ' + arr[prop]);
}