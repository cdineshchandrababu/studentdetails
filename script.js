// Sample initial student data
let students = [
    { id: 1, name: "John Doe", age: 20, grade: "A" },
    { id: 2, name: "Jane Smith", age: 22, grade: "B" }
];

const studentTableBody = document.getElementById("studentTableBody");
const studentForm = document.getElementById("studentForm");

// Function to display students in the table
function displayStudents() {
    // Clear existing table rows
    studentTableBody.innerHTML = "";

    // Loop through students array and add rows to the table
    students.forEach(student => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
            <td>
                <button onclick="editStudent(${student.id})">Edit</button>
                <button onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

// Function to add a new student
function addStudent(name, age, grade) {
    const id = students.length + 1;
    students.push({ id, name, age, grade });
    displayStudents();
}

// Function to edit a student
function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    // Prefill form with current values
    document.getElementById("name").value = student.name;
    document.getElementById("age").value = student.age;
    document.getElementById("grade").value = student.grade;

    // Replace submit handler with update function
    studentForm.onsubmit = function(event) {
        event.preventDefault();
        student.name = document.getElementById("name").value;
        student.age = document.getElementById("age").value;
        student.grade = document.getElementById("grade").value;
        displayStudents();
        studentForm.reset();
        studentForm.onsubmit = function(event) {
            event.preventDefault();
        }
    }
}

// Function to delete a student
function deleteStudent(id) {
    students = students.filter(student => student.id !== id);
    displayStudents();
}

// Event listener for form submission
studentForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const grade = document.getElementById("grade").value;
    addStudent(name, age, grade);
    studentForm.reset();
});

// Display initial students
displayStudents();
