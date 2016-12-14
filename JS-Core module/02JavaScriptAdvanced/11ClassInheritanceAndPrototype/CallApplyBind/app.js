var person = {
    firstname: 'John',
    lastname: 'Doe',
    getFullName: function() {
        
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
        
    }
}

var logName = function(lang1, lang2) {

    console.log('Logged: ' + this.getFullName());
    console.log('Arguments: ' + lang1 + ' ' + lang2);
    console.log('-----------');
    
}
//bind() прави копие на функцията като подава this-а на кой обект да се ползва, също така може да зададе default стойност като 2-ри и трети параметър, като с;ед като се извика
//съответната функция те НЕс могат да бъдат заменени с параметри подадени от потребителя.
//call() и apply() не правят копие на функция а я извикват директно, като първият параметър е this а следващите са параметрите на самата функция разликата е че първото приема поредица от аргументи докато
//второто приема масив от стойности, като втори аргумент .
var logPersonName = logName.bind(person);
logPersonName('en');

logName.call(person, 'en', 'es');
logName.apply(person, ['en', 'es']);

(function(lang1, lang2) {

    console.log('Logged: ' + this.getFullName());
    console.log('Arguments: ' + lang1 + ' ' + lang2);
    console.log('-----------');
    
}).apply(person, ['es', 'en']);

// function borrowing
var person2 = {
    firstname: 'Jane',
    lastname: 'Doe'
}

console.log(person.getFullName.apply(person2));

// function currying
function multiply(a, b) {
    return a*b;   
}

var multipleByTwo = multiply.bind(this, 2);
console.log(multipleByTwo(4));

var multipleByThree = multiply.bind(this, 3);
console.log(multipleByThree(4));