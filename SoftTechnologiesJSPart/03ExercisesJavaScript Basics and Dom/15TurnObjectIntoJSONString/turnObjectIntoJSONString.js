function solve(arr) {
    let students = [];
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        let temp = arr[i].split(' -> ')
        let key = temp[0];
        let value = temp[1];


        students.push({[key]: value});
    }

    // console.log(JSON.stringify(students));


    obj.name = (students[0].name);
    obj.surname = (students[1].surname);
    obj.age = (Number(students[2].age));
    obj.grade = (Number(students[3].grade));
    obj.date = (students[4].date);
    obj.town = (students[5].town);


    console.log(JSON.stringify(obj));

}

solve(["name -> Angel",
       "surname -> Georgiev",
       "age -> 20",
       "grade -> 6.00",
       "date -> 23/05/1995",
       "town -> Sofia"]);