$('#submit').click(send);
$('#refresh').click(refresh);

let hostUrl = "https://messingersoftuni.firebaseio.com/messenger.json";

function send() {
    let message = {
        author: $('#author').val(),
        content: $('#content').val(),
        timestamp: Date.now()
    };

    //$('#content').val("");


    $.post(hostUrl, JSON.stringify(message)).then(refresh); // поства съобщението като нов обект и презарежда чрез refresh.
}

function refresh() {
    $.get(hostUrl)
        .then((result) => {
           // $('#messages').empty()
            let keys = Object.keys(result).sort((m1,m2) => result[m1].timestamp - result[m2].timestamp) // прави масив като след това го сортира по timestamp от два обекта (минава през всички).
            for (let msg of keys) { // for of защото keys е масив, идващ от финкцията Object.key().
               $('#messages').append(`${result[msg].author}: ${result[msg].content}\n`)
            }

        });

}



