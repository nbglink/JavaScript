function main(input){
    let methodPattern = /Method: (GET|POST|PUT|DELETE)/g;
    let credentialsPattern = /Credentials: (Basic|Barer) ([a-zA-Z0-9]+)/g;
    let contentPattern = /^[a-zA-Z0-9.]$/g;

    let hash = input.pop().split('');

    function validateToken(hash, token) {
        for (let i = 0; i < hash.length; i+=2) {
            let neededOccurences = Number(hash[i]);
            let neededCharacter = hash[i+1];

            if((token.match(new RegExp(neededCharacter, "g")) || []).length == neededOccurences){
                return true;
            }
        }

        return false;
    }


    for (let i = 0; i < input.length; i+=3){

        let methodPattern = /^Method: (GET|POST|PUT|DELETE)$/g;
        let credentialsPattern = /^Credentials: (Basic|Bearer) ([a-zA-Z0-9]+)$/g;
        let contentPattern = /^Content: [a-zA-Z0-9.]+$/g;

        let methodMatch = methodPattern.exec(input[i]);
        let credentialsMatch = credentialsPattern.exec(input[i + 1]);
        let contentMatch = contentPattern.exec(input[i + 2]);

        let resultRespose = "";


        if(methodMatch && credentialsMatch && contentMatch){
            let method = methodMatch[1];
            let autenticationType = credentialsMatch[1];
            let autenticationToken = credentialsMatch[2];

            resultRespose = "Response-Method:" + method;
            switch(method){
                case "GET":
                    resultRespose += "&Code:200&Header:" + autenticationToken;
                    break;
                case "POST":
                case "PUT":
                case "DELETE":
                    if(autenticationType == "Basic"){

                        resultRespose += "&Code:401";

                    } else {

                        resultRespose += "&Code:200&Header:" + autenticationToken;

                    }

                    break;

            }

            if(!validateToken(hash, autenticationToken) && resultRespose.indexOf("Header")> 1){
                resultRespose = "Response-Method:" + method + "&Code:403";
            }
        }else{
            resultRespose = 'Response-Code:400';
        }

        console.log(resultRespose);

    }


}

let arr = [
    'Method: GET',
'Credentials: Bearer asd918721jsdbhjslkfqwkqiuwjoxXJIdahefJAB',
'Content: users.asd.1782452.278asd',
'Method: POST',
'Credentials: Basic 028591u3jtndkgwndsdkfjwelfqkjwporjqebhas',
'Content: Johnathan',
'2q'
];

main(arr);