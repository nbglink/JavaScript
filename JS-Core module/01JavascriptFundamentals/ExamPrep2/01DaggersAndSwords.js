function solve(input) {

    let bladeArr = input
        .map((x) => Number(x))
        .map((x) => Math.floor(x));

    let result = `<table border="1">
<thead>
<tr><th colspan="3">Blades</th></tr>
<tr><th>Length [cm]</th><th>Type</th><th>Application</th></tr>
</thead>
<tbody>\n`;


    for (let blade of bladeArr) {

        let daggerOrSword;

        if (blade > 40) {
            daggerOrSword = 'sword';
        }
        else {
            daggerOrSword = 'dagger';
        }

        let bladeApplication;

        if (blade > 10) {

            let measure = blade % 5;

            switch (measure) {
                case 1:
                //case 6:
                    bladeApplication = 'blade';
                    break;
                case 2:
                //case 7:
                    bladeApplication = 'quite a blade';
                    break;
                case 3:
                //case 8:
                    bladeApplication = 'pants-scraper';
                    break;
                case 4:
                //case 9:
                    bladeApplication = 'frog-butcher';
                    break;
                case 0:
                //case 10:
                    bladeApplication = '*rap-poker';
                    break;

            }


            result += `<tr><td>${blade}</td><td>${daggerOrSword}</td><td>${bladeApplication}</td></tr>\n`
        }

    }

    result += `</tbody>
</table>
`

    console.log(result);


}

solve(['17.8',
    '19.4',
    '13',
    '55.8',
    '126.96541651',
    '3'
]);


