let appId = "kid_BJXTsSi-e";
let appSecret = "447b8e7046f048039d95610c1b039390";

let token = "Basic " + btoa("guest:guest");

let baseUrl = "https://baas.kinvey.com/appdata/kid_BJXTsSi-e/knock";

let requestUrl = baseUrl + "?query=Knock Knock.";

$.ajax ({
    url:requestUrl,
    headers: {
        "Authorization" : token,
        "Content-Type" : "application/json"
    },
    success: function (success) {
        console.log(success.answer);
        console.log(success.message);
        requestUrl = baseUrl + "?query=" + success.message;
        $.ajax({
            url:requestUrl,
            headers: {
                "Authorization" : token,
                "Content-Type" : "application/json"
            },
            success: function (success2) {
                console.log(success2.answer);
                console.log(success2.message);
                requestUrl = baseUrl + "?query=" + success2.message;
               $.ajax({ url:requestUrl,
                    headers: {
                    "Authorization" : token,
                        "Content-Type" : "application/json"
                },
                success: function (success3) {
                    console.log(success3.answer);// last message
                    //console.log(success3.message); // undefined
                },

                   error: function (error3) {
                       console.log(error3);
                   }

                });
            },

            error: function (error2) {
                console.log(error2);
            }
        })
    },
    error: function (error) {
        console.log(error);
    }
});