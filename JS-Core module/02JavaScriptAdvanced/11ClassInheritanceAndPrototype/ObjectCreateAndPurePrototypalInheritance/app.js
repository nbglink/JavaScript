//Polyfill for older JS engines
if(!Object.create){
    Object.create = function (o) {
        if (arguments.length > 1) {
            throw new Error('Object.create implementation only accepts the first parameter.')
        }
        function F() {
        }

        F.prototype = o;
        return new F();
    };
}


//клас функция || constructor функция
function Cat (name, breed, eyes){
    this.name = name;
    this.breed = breed;
    this.eyes = eyes;
}

//нов обект от класа
let lovely = new Cat('Lovely', 'Mirkovska Podobrena', 'darkbrown' );

console.log(lovely);

//добавяне на функция към прототипа на класа
Cat.prototype.printNameAndBreed = function () {
    return `Име: ${this.name}  Порода: ${this.breed}`;
};
Cat.prototype.printNameAndEyesColor = function () {
    return `Име: ${this.name}  Цвят на очите: ${this.eyes}`;
};

//принтиране на обекта
console.log(lovely.printNameAndBreed());

//наследяване на обекта чрез prototype
let kotio = Object.create(lovely);
kotio.name = "Kotio";
kotio.eyes = "Brown";

//принтиране на функцията създадена чрез прототипа.
console.log(kotio.printNameAndBreed());

let grey =  Object.create(lovely);
grey.name = "Grey";
grey.eyes = "greyblue";

console.log(grey.printNameAndEyesColor());


//примери от урока

let person = {
    firstname: 'Default',
    lastname: 'Default',
    a: 2,
    b: 4,
    greet: function() {
        return 'Hi ' + this.firstname;
    },
    myKeyFunctuion: function (a,b) {
        let x = +a || this.a ;
        let z = +b || this.b ;

        return x * z ;
    }
};

let john = Object.create(person);
john.firstname = 'John';
john.lastname = 'Doe';


let jane = Object.create(person);
jane.firstname = 'Jane';
jane.lastname = 'Vuchkova';



console.log(john);
console.log(jane.greet());
console.log(john.myKeyFunctuion());
console.log(jane.myKeyFunctuion(2,10));

//наследяване на обект използвайки prototype