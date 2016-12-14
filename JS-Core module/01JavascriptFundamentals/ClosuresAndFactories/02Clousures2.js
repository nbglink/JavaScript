function buildFuntions() {

    var arr = [];

    for (var i = 0; i < 3; i++) {

        arr.push(
            function () {
                console.log(i);
            }
        )

    }

  return arr;

}

var fs = buildFuntions();

fs[0]();
fs[1]();
fs[2]();

function buildFuntions2() {

    var arr = [];

    for (var i = 0; i < 3; i++) {

        arr.push(
            (function (j) {
                return function() {
                    console.log(j);
                }

            }(i))
        )

    }

    return arr;

}

var fs2 = buildFuntions2();

fs2[0]();
fs2[1]();
fs2[2]();

