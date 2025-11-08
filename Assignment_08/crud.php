<?php
$conn = mysqli_connect("localhost", "root", "", "student");

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$action = $_GET['action'] ?? '';

// READ (Select all)
if ($action == "read") {
    $res = mysqli_query($conn, "SELECT * FROM student_data");
    $students = array();
    while ($row = mysqli_fetch_assoc($res)) {
        $students[] = $row;
    }
    echo json_encode($students);
}

// CREATE (Insert new)
if ($action == "create") {
    $name = $_POST['name'];
    $marks = $_POST['marks'];
    $sql = "INSERT INTO student_data(name, marks) VALUES('$name', '$marks')";
    if (mysqli_query($conn, $sql)) {
        echo "Student Added!";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}

// UPDATE
if ($action == "update") {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $marks = $_POST['marks'];
    $sql = "UPDATE student_data SET name='$name', marks='$marks' WHERE id=$id";
    if (mysqli_query($conn, $sql)) {
        echo "Student Updated!";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}

// DELETE
if ($action == "delete") {
    $id = $_POST['id'];
    $sql = "DELETE FROM student_data WHERE id=$id";
    if (mysqli_query($conn, $sql)) {
        echo "Student Deleted!";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>
