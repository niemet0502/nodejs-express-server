const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(bodyParser.json());

// Define a variable to hold the students data
const students = [];

// Endpoint to create a new student
app.post("/student", (req, res) => {
  const { firstname, lastname, age } = req.body;
  const id = students.length + 1;

  const student = {
    id,
    firstname,
    lastname,
    age,
  };

  students.push(student);

  res.status(201).json(student);
});

// Endpoint to update an existing student
app.put("/student/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { firstname, lastname } = req.body;

  const student = students.find((s) => s.id === id);

  if (!student) {
    res.sendStatus(404);
  } else {
    student.firstname = firstname || student.firstname;
    student.lastname = lastname || student.lastname;

    res.json(student);
  }
});

// Endpoint to get a list of all students
app.get("/students", (req, res) => {
  res.json(students);
});

// Endpoint to delete a student by id
app.delete("/student/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    res.sendStatus(404);
  } else {
    students.splice(index, 1);

    res.sendStatus(204);
  }
});

// Endpoint to find a student by name
app.get("/student", (req, res) => {
  const name = req.query.critereRecherche;

  const filteredStudents = students.find(
    (student) =>
      student.firstname.toLowerCase() === name.toLowerCase() ||
      student.lastname.toLowerCase() === name.toLowerCase()
  );

  if (!filteredStudents) {
    res.sendStatus(404);
  }
  res.send(filteredStudents);
});

// Endpoint to find a student by id
app.get("/student/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  const student = students.find((s) => s.id === id);

  if (!student) {
    res.sendStatus(404);
  } else {
    res.json(student);
  }
});

app.listen(3000, () => {
  console.log("the app is listening on the port 3000");
});
