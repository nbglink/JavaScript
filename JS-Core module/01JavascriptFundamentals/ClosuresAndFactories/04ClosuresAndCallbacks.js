function sayHiLater() {
    
    var greeting = "Hi";
    
    
    setTimeout(function () {
        console.log(greeting);
    }, 3000)
    
}


sayHiLater();

function tellMeWhenDone(callback) {

    var a = 1000; // some work(just for example)
    var b = 2000; // some work(just for example)

    callback(); // the 'callback', it runs the function I give it!

}

tellMeWhenDone(function () {
    console.log('I am done');
});

tellMeWhenDone(function () {
    console.log('All done');
});