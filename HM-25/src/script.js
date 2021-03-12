const URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/students';

const taskList = document.getElementById('taskList');
const taskMarks = document.getElementById('task_marks');
const taskTemplate = document.querySelector('#taskStudentsTemplate').innerHTML;
const creatNewStudent = document.getElementById('#creat_new_student');
const studentInput = document.querySelector('#new-student-input');
const newStudentSection = document.querySelector('.new-student-section');
const submitStudentInput = document.querySelector('#submit-student-input')
const addStud = document.querySelector('#add_student')


document.addEventListener("DOMContentLoaded", function () {
    submitStudentInput.addEventListener('click', onAddStudentClick);
    addStud.addEventListener('click', showNewStudentInput);
});

taskList.addEventListener('click', onDellStudentClick)


init();

function init() {
    getList();
}

function getList() {
    fetch(URL)
        .then((res) => res.json())
        .then(setData)
        .then(renderList);
}

let list = [];

function onMarkFocusOut(e) {
    const inputValue = e.target.value;

    const studentId = this.getAttribute('data-student-id');
    const markIndex = Number(this.getAttribute('data-index'));

    const student = list.find(st => st.id === studentId);

    student.marks = student.marks.map((mark, index) => {
        return index === markIndex ? inputValue : mark;
    });

    editStudent(student);
}

function editStudent(student) {
    fetch(`${URL}/${student.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
    });
}

function showNewStudentInput() {
    newStudentSection.classList.toggle('show')
}

function onAddStudentClick() {
    newStudent(studentInput.value);
}

function newStudent(name) {
    const sticker = {
        name,
        marks: [],
    }
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sticker),
    })
        .then((sticker) => {
            getList();

        });
}

function renderStudent(sticker) {
    stickerrr = getStudentHtml(sticker)
    taskList.append(stickerrr);
}



function setData(data) {
    return (list = data);
}

function renderList(data) {
    taskList.innerHTML = data.map(getContactElementHtml).join('');

    document.querySelectorAll('.student_mark').forEach(item => {
        item.addEventListener('focusout', onMarkFocusOut);
    });
}

function getMarksHtml(marks = [], studentId) { 
    marks = marks || [];
    return marks.map((mark, index) =>
        `<input data-student-id="${studentId}" data-index="${index}" type="number" class="student_mark" value="${mark}">`
    );
}

function getContactElementHtml(item) {
    return taskTemplate
        .replace('{{name}}', item.name)
        .replace('{{id}}', item.id)
        .replace('{{marks}}', getMarksHtml(item.marks, item.id))
}

function onDellStudentClick(e) {
    switch (true) {
        case e.target.classList.contains('delete-btn'):
            deleteSticker(e.target.parentElement.dataset.id);
            break;
    }
}

function deleteSticker(id) {
    list = list.filter((el) => el.id != id);

    deleteStickerElement(id);

    fetch(`${URL}/${id}`, {
        method: 'DELETE',
    }).then(getList);
}

function deleteStickerElement(id) {
    const element = getStickerElement(id);

    element && element.remove();
}
function getStickerElement(id) {
    return list.find(elem => elem === `[data-id="${id}"]`);
}
