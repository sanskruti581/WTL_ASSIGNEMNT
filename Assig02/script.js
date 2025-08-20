function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();
  if (taskText === "") return;

  let row = document.createElement("tr");
  row.setAttribute("data-status", "pending");

  let tdTask = document.createElement("td");
  tdTask.textContent = taskText;
  row.appendChild(tdTask);

  let tdStatus = document.createElement("td");
  tdStatus.textContent = "Pending";
  row.appendChild(tdStatus);

  let tdActions = document.createElement("td");

  let doneBtn = document.createElement("button");
  doneBtn.textContent = "✅";
  doneBtn.title = "Mark Complete";
  doneBtn.addEventListener("click", function () {
    tdTask.classList.toggle("completed");
    let isCompleted = tdTask.classList.contains("completed");
    tdStatus.textContent = isCompleted ? "Completed" : "Pending";
    row.setAttribute("data-status", isCompleted ? "completed" : "pending");
  });
  tdActions.appendChild(doneBtn);

  let updateBtn = document.createElement("button");
  updateBtn.textContent = "✏️";
  updateBtn.title = "Edit Task";
  updateBtn.addEventListener("click", function () {
    let newText = prompt("Update your task:", tdTask.textContent);
    if (newText) tdTask.textContent = newText;
  });
  tdActions.appendChild(updateBtn);

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.title = "Delete Task";
  deleteBtn.addEventListener("click", function () {
    row.remove();
  });
  tdActions.appendChild(deleteBtn);

  row.appendChild(tdActions);
  document.querySelector(".taskBody").appendChild(row);
  taskInput.value = "";
}

function filterTasks(type, element) {
  let rows = document.querySelectorAll(".taskBody tr");
  rows.forEach(row => {
    let status = row.getAttribute("data-status");
    if (type === "all" || status === type) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });

  document.querySelectorAll("nav div").forEach(div => div.classList.remove("active"));
  element.classList.add("active");
}
