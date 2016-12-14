function solve(input) {
    let result = new Map();

    for(let line of input) {
        let details = line.split('|');
        let color = details[0];

        if(!result.has(color)){
            result.set(color, new Map());
            result.get(color).set('age', '');
            result.get(color).set('name', 1);
            result.get(color).set('wins', 1);
            result.get(color).set('losses', 1);
            result.get(color).set('opponents', []);

        }

        switch (details[1]){
            case 'age':
                result.get(color).set('age', details[2]);
                break;
            case 'name':
                result.get(color).set('name', details[2]);
                break;
            case 'win':
                result.get(color).set('losses', result.get(color).get('losses') + 1);
                result.get(color).get('opponents').push(details[2]);
                break;
            case 'loss':
                result.get(color).set('wins', result.get(color).get('wins') + 1);
                result.get(color).get('opponents').push(details[2]);
                break;
        }

    }

    for (let key of result.keys()){
        if(result.get(key).get('name') == '' ||
            result.get(key).get('age') == ''){
            result.delete(key);
            continue;
        }
        result.get(key).set('rank', (result.get(key).get('wins') / result.get(key).get('losses')).toFixed(2));
        result.get(key).delete('wins');
        result.get(key).delete('losses');
        result.get(key).get('opponents').sort()
    }

   let finalResult = [...result.entries()].sort((e1, e2) => e1[0].localeCompare(e2[0]));

    let finalFinal = {};

    for (let [key, value] of finalResult){
        finalResult[key] = {};
        for(let[k, v] of value){
            finalFinal[key][k] = v;
        }
    }

    console.log(JSON.stringify(finalFinal));
}

solve([ 'purple|age|99',
    'red|age|44',
    'blue|win|pesho',
    'blue|win|mariya',
    'purple|loss|Kiko',
    'purple|loss|Kiko',
    'purple|loss|Kiko',
    'purple|loss|Yana',
    'purple|loss|Yana',
    'purple|loss|Manov',
    'purple|loss|Manov',
    'red|name|gosho',
    'blue|win|Vladko',
    'purple|loss|Yana',
    'purple|name|VladoKaramfilov',
    'blue|age|21',
    'blue|loss|Pesho' ]);


