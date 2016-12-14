class Rectangle {
    constructor(width, height, color){
        this.width = width;
        this.height = height;
        this.color = color;
    }

    calcArea() {
        return this.width * this.height;
    }

}

let redRect = new Rectangle(4,5,'red');
let blueRect = new Rectangle(8,3,'blue');

console.log(blueRect.calcArea());
