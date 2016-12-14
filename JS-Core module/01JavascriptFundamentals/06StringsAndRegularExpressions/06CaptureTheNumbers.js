function solve(input) {

    let givenStr = input.join(' ');
    let numberPattern = /\d+/g;

    let result = givenStr.match( numberPattern );

    console.log(result.join(" "))
}

solve([
    'The300',
    'What is that?',
    'I think it’s the 3rd movie.',
    'Lets watch it at 22:45']);

