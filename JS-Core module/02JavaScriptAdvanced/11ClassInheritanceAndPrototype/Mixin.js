function asCircle() {
    this.area = function() {
        return Math.PI * this.radius * this.radius;
    };
    return this;
}
class Circle {
    constructor(r) { this.radius = r; }
}

asCircle.call(Circle.prototype);// слага миксин функцията asCircle, като прототип на класа, става негов метод.

let circle = new Circle(5);
console.log(circle.area());

