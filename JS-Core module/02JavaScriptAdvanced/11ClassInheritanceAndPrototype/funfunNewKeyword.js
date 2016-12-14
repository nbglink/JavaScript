function Person(sayng) {
    this.sayng = sayng
}

Person.prototype.talk = function () {
    console.log('I say:', this.sayng);
};

var crockford = new Person('SEMICOLANS !!!1one1');
crockford.talk();