// server.js
const express = require("express");
const app = express();

app.use(express.json()); // To read JSON body data
app.use(express.static("public")); // To serve static files (HTML, CSS, JS)

// Temporary STUDENT DATA (In-memory)
let students = [
  { id: 1, name: "Sans", marks: 88 },
  { id: 2, name: "Riya", marks: 92 },
];

// ------------------------------------
// BASIC ROUTES
// ------------------------------------

// Home page (served from /public/index.html automatically)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Send full student list (JSON)
app.get("/students", (req, res) => {
  res.json(students);
});

// ------------------------------------
// RESTful API (CRUD)
// ------------------------------------

// CREATE (POST)
app.post("/students", (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.json({ message: "Student added", data: students });
});

// READ (GET single student by ID)
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);
  res.json(student || { message: "Student not found" });
});

// UPDATE (PUT)
app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updated = req.body;

  students = students.map((s) => (s.id === id ? updated : s));
  res.json({ message: "Student updated", data: students });
});

// DELETE (DELETE)
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter((s) => s.id !== id);
  res.json({ message: "Student deleted", data: students });
});

// ------------------------------------

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
