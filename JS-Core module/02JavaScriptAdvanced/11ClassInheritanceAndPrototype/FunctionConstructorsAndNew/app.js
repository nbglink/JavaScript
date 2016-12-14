function Person(firstname, lastname){
    console.log(this);
    this.firstname = firstname;
    this.lastname = lastname;
    console.log('This function is invoked.');
}

let john = new Person("John", "Doe");
console.log(john);

let jane = new Person("Jane", "Doe");
console.log(jane);