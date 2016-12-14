class Person {
        constructor(name, email)
        {
            this.name = name;
            this.email = email;
        }
        toString()
        {
            let className = this.constructor.name;
            return `${className} (name: ${this.name}, email: ${this.email})`;
        }
    }

    class Teacher extends Person {
        constructor(name, email, subject) {
            super(name, email);
            this.subject = subject;
        }

        toString() {
            let baseStr = super.toString().slice(0, -1);
            return baseStr + `, subject: ${this.subject})`;
        }
    }

    class Student extends Person {
        constructor(name, email, course) {
            super(name, email);
            this.course = course;
        }

        toString() {
            let baseStr = super.toString().slice(0, -1);
            return baseStr + `, course: ${this.course})`;
        }
    }

//Тук екстендваме прототипа на подаден клас baseClass
    function extendPrototype(baseClass) {
        baseClass.prototype.species = "Human";
        baseClass.prototype.toSpeciesString = function () {
            return `I am a ${this.species}. ${this.toString()}`;
        }
    }

    extendPrototype(Person);// подаваме класа, който ще инстанцираме.


let p = new Person ('Gosho', 'aaa');

console.log(p.toString());
console.log(p.toSpeciesString());


let t = new Teacher("Ivan", "iv@yahoo.com", "PHP");
console.log("Teacher: " + t.name +
    ' (' + t.email + '), teaches ' + t.subject);
console.log(t.toSpeciesString());

//сменяме вида на Teacher обекта(инстанцията) от Human на Rabbit, чрез прототипа, Person класа си остава вид Human.
t.species = "Rabbit";
console.log(t.toSpeciesString());
console.log(p.toSpeciesString());

let t2 = new Teacher("Stamat", "iv@yahoo.com", "PHP");
console.log(t2.toString());

//Променяме прототипа на t2 обекта.
//console.log(Object.getPrototypeOf(Object.getPrototypeOf(t2)).species = 'Turtle'); // Смяна на прототипа за species на Person класа, чрез търсене по веригата.
console.log('--------------------------------------------------------------------------');
console.log(Person.prototype.species = 'Turtle'); //същото както отгоре само че не търся прототипа, а направо го задавам на класа.
console.log(t.toSpeciesString());
console.log(p.toSpeciesString());


