var person = {
    firstname: 'John',
    lastname: 'Doe',
    getFullName: function () {

        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;

    }
}

var logName = function (lang1, lang2) {

    console.log('Logged: ' + this.getFullName());
    console.log('Arguments: ' + lang1 + ' ' + lang2);
    console.log('-----------');

}//bind(person);

var logPersonName = logName.bind(person);
logPersonName('en');

logName.call(person, 'en', 'es'); // 1st what will be "this" variable and then pass the second and third argument.
logName.apply(person, ['en', 'es']); // the same as the above but only wants array for arguments




(function (lang1, lang2) {

    console.log('Logged: ' + this.getFullName());
    console.log('Arguments: ' + lang1 + ' ' + lang2);
    console.log('-----------');

}).apply(person, ['es', 'en']);


//function borrowing
var person2 = {
    firstname: 'Jane',
    lastname:'Doe'
}

console.log(person.getFullName.apply(person2));


// function currying ! COPY OF FUNCTION BUT WITH SOME PRESET PARAMETERS.
function multiply(a,b) {
    return a*b;
}

var multipleByTwo = multiply.bind(this, 2);
console.log(multipleByTwo(4));
//the above line makes copy of the function and make first argument permanent like the function bottom this line.

// function multiply(b) {
//     var a=2;
//     return a*b;
// }

var multipleByTwo = multiply.bind(this, 3);
console.log(multipleByTwo(4));




