function solve(arr) {

    class Student {
        constructor(name, age, grade) {
            this.Name = name;
            this.Age = age;
            this.Grade = grade;
        }
    }


    let students = [];
    for (let i = 0; i < arr.length; i++) {
        let temp = arr[i].split(' -> ')
        let name = temp[0];
        let age = temp[1];
        let grade = temp[2];

        // students.push({Name: name, Age: age, Grade: grade});
        students.push(new Student(name, age, grade));
    }
    for (let s of students) {
        console.log(`Name: ${s.Name}`);
        console.log(`Age: ${s.Age}`);
        console.log(`Grade: ${s.Grade}`);
    }



}

solve(["Pesho -> 13 -> 6.00", "Ivan -> 12 -> 5.57", "Toni -> 13 -> 4.90"]);