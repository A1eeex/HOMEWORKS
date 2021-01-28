// Написать два класса Group и Student,  чтобы их можно было использовать так:
// const feGroup = new Group();
// const firstStudent = new Student('John Doe', [10, 102, 0]);

// feGroup.addStudent( new Student('John Doe', [10, 10, 5, 10]));
// feGroup.addStudent(new Student('Alex Smith', [10, 9, 8]));
// feGroup.addStudent(new Student('Bob Johnson', [9, 10, 10, 8]));

// console.log(feGroup.students); // [{},{},{}]
// console.log(feGroup.getAverageMark()); // 20

// У группы должны быть методы

// addStudent() - который принимает массив студентов и сохрнаняет их у себя
// getAverageMark() - который возвращает среднее из всех оценок
// и readonly "свойство"

// students в котором должен мы массив всех студентов
// ----------------------------------------------------------------------------------------------------------------
'use strict'
class Student {
    constructor(name, marks) {
        this._name = name
        this._marks = marks
    }
}

class Group {
    constructor() {
        this._students = []
    }
    get students() {
        return this._students
    }
    addStudent(student) {
        this._students.push(student)
    }
    getAverageMark() {
        let grouAverageMark = this._students.flatMap(({ _marks }) => _marks)
        return grouAverageMark.reduce((sum, mark) => sum + mark) / grouAverageMark.length
    }
}

const feGroup = new Group();

const firstStudent = new Student('John Doe', [10, 102, 0])
const secondStudent = new Student('Dohn Joe', [10, 10, 5, 10])
const thirdStudent = new Student('Alex Smith', [10, 9, 8])
const fourthStudent = new Student('Bob Johnson', [9, 10, 10, 8])

feGroup.addStudent(firstStudent)
feGroup.addStudent(secondStudent)
feGroup.addStudent(thirdStudent)
feGroup.addStudent(fourthStudent)

console.log(feGroup.students)
// console.log(feGroup.students[2] = 'You are hacked')
// console.log(feGroup.students)
console.log(feGroup.getAverageMark())

