// function solve() {


    class Figure {
        constructor() {
            if (new.target === Figure) {
                throw new Error('Не може да инстанцираш абстрактен клас!')
            }
        }

        toString() {
            return `${this.constructor.name} - `;
        }
    }

    class Circle extends Figure {
        constructor(radius) {
            super();
            this.radius = radius;
        }

        toString() {
            return `${super.toString()}radius: ${this.radius}`
        }

        get area() {
            return Math.PI * this.radius * this.radius;
        }
    }

    class Rectangle extends Figure {
        constructor(width, height) {
            super();
            this.width = width;
            this.height = height;
        }

        toString() {
            return `${super.toString()}width: ${this.width}, height: ${this.height}`;
        }

        get area() {
            return this.width * this.height;
        }


    }
//     return {Figure, Circle, Rectangle}
// }
let fig = new Circle(8);
console.log('The figure is:' + fig);

let rect = new Rectangle(3,5);
console.log('The figure is:' + rect);
console.log('The area is: ' + rect.area);

