function Student(studentID, fullName, dob, className, gpa) {
    this.studentID = studentID;
    this.fullName = fullName;
    this.dob = dob;
    this.className = className;
    this.gpa = gpa;

    this.displayInfo = function() {
        return `<tr>
                    <td>${this.studentID}</td>
                    <td>${this.fullName}</td>
                    <td>${this.dob}</td>
                    <td>${this.className}</td>
                    <td>${this.gpa.toFixed(2)}</td>
                    <td><button onclick="editStudent('${this.studentID}')">Sửa</button></td>
                </tr>`;
    }

    this.updateInfo = function(fullName, dob, className, gpa) {
        this.fullName = fullName;
        this.dob = dob;
        this.className = className;
        this.gpa = gpa;
    }
}

const students = [];

function addStudent() {
    const studentID = document.getElementById('studentID').value;
    const fullName = document.getElementById('fullName').value;
    const dob = document.getElementById('dob').value;
    const className = document.getElementById('class').value;
    const gpaInput = parseFloat(document.getElementById('gpa').value);

    if (isNaN(gpaInput) || gpaInput < 0 || gpaInput > 4) {
        document.getElementById('gpaError').innerText = 'Điểm GPA không hợp lệ. Vui lòng nhập lại.';
        return;
    }

    const gpa = Math.min(4, Math.max(0, gpaInput));
    document.getElementById('gpaError').innerText = '';

    const newStudent = new Student(studentID, fullName, dob, className, gpa);
    students.push(newStudent);

    displayStudents();
    clearForm();
}

function displayStudents() {
    const table = document.getElementById('studentTable');
    table.innerHTML = `<tr>
                        <th>Mã SV</th>
                        <th>Họ và tên</th>
                        <th>Ngày sinh</th>
                        <th>Lớp học</th>
                        <th>Điểm GPA</th>
                        <th>Thao tác</th>
                      </tr>`;

    students.forEach(student => {
        table.innerHTML += student.displayInfo();
    });
}

function editStudent(studentID) {
    const student = students.find(s => s.studentID === studentID);

    if (student) {
        const fullName = prompt("Nhập tên mới:", student.fullName);
        const dob = prompt("Nhập ngày sinh mới:", student.dob);
        const className = prompt("Nhập lớp học mới:", student.className);
        const gpaInput = parseFloat(prompt("Nhập điểm GPA mới:", student.gpa));

        if (isNaN(gpaInput) || gpaInput < 0 || gpaInput > 4) {
            alert('Điểm GPA không hợp lệ. Vui lòng nhập lại.');
            return;
        }

        const gpa = Math.min(4, Math.max(0, gpaInput));

        student.updateInfo(fullName, dob, className, gpa);
        displayStudents();
    }
}

function clearForm() {
    document.getElementById('studentForm').reset();
}
