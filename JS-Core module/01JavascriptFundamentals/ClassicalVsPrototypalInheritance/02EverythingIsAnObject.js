var person = {
    firstname: 'Default',
    lastname: 'Default',
    getFullName: function () {
        return this.firstname + ' ' + this.lastname;
    }
};

var john = {
    firstname:'John',
    lastname:'Doe'
};


// don't do this EVER! for demo purposes only!!!

john.__proto__ = person;

for (let prop in john) {
    if(john.hasOwnProperty(prop))
        console.log(prop + ': ' + john[prop]);
}