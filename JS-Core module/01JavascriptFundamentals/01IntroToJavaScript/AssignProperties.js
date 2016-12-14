function solve([propName, name, propAge, age, propGender, gender ]) {

    var obj = {};

    obj[propName] =  name;
    obj[propAge] = age;
    obj[propGender] = gender;

    console.log(obj);

}

solve(['name', 'Pesho', 'age', '23', 'gender', 'male'])
