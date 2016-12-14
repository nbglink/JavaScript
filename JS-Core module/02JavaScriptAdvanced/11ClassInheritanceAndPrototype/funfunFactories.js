// class Dog {
//     constructor(){
//         this.sound = "woof"
//     }
//     talk(){
//         console.log(this.sound);
//     }
// }
//
// const sniffles = new Dog();
// sniffles.talk();

//$('button.myButton').click( sniffles.talk.bind(sniffles) ); // izvikvane na click event ot class
//$('button.myButton').click( _ => sniffles.talk() ); // izvikvane na click event ot class alternativen

//FACTORY FUNCTION something like a class...
//
// const dog = () => {
//     const sound = 'woof';
//     return {
//         talk: () => console.log(sound)
//     }
// };
//
// const sniffles = dog();
// sniffles.talk();
//
// $('button.myButton')
//     .click(sniffles.talk); // works

const barker = (state) => ({
    bark: () => console.log('Woof, I am ' + state.name)
});


const driver = (state) => ({
    drive: () => state.position = state.position + state.speed
});




const murderRobotDog = (name) => {
    let state = {
        name,
        speed: 100,
        position: 0
    };

    return Object.assign(
        {},
        barker(state),
        driver(state)
    )
}

murderRobotDog('Sniffles').bark();
