function aggregateTable(lines){
    let sum = 0, list = [];

    for (let line of lines) {
        let townData = line.split('|'),
            townName = townData[1].trim(),
            income = Number(townData[2].trim());
        list.push(townName);
        sum += income;
    }
    console.log(list.join(', ') + '\n' + sum);

}


console.log(aggregateTable(['| Sofia | 300',
    '| Plovdiv | 500',
    '| Varna | 200',
    '| Yambol | 275']));