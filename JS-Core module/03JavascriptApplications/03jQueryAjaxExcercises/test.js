var data = {
    '1457458375537': {
        'message': 'this is the message',
        'subject': 'my subject'
    },
    '1457467436271': {
        'message': 'test message',
        'subject': 'hello'
    }
};

Object.keys(data).forEach(function(key) {
    console.log(key); // prints property name - long number
    console.log(data[key].message);
    console.log(data[key].subject);
});
