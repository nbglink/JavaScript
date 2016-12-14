function solve ([input]){

    let pattern = /[-[\]{}()*+?.,\\^$|#;@%&$^:"">>~`!\s]/g;

    let matchArr = input.split(pattern);

    for (let i = 0; i < matchArr.length; i++) {
        if (matchArr[i] == "") {
            matchArr.splice(i, 1);
            i--;
        }
    }

    let result = matchArr.join("|");
    console.log(result);
}


solve(['A Regular Expression needs to have the global flag in order to match all occurrences in the text'])
solve(['Some random words and letters and other things. In a sentence, also there are some signs like + or ? Sentences can also have semicolons; or dots. and !'])
solve(['A #%^ lo^#^t of@%*symbols(@i@%~n~)`this......sentence...123456789*&%#0:"">>?:{{!@#@@#$%The+_)(*&^%$#@!End.'])
