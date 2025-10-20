import { readFile, writeFile, appendFile } from "node:fs";
import { argv } from "node:process";

readFile("tasks.json", "utf8", (err, data) => {
  if (err) {
    writeFile("tasks.json", "[]", (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log("File written successfully!");
    });
  } else {
    try {
      switch (argv[2]) {
        case "add":
          const oldData = JSON.parse(data);
          const currentDate = new Date();
          const month = currentDate.getMonth() + 1;
          const year = currentDate.getFullYear();
          const day = currentDate.getDate();
          console.log(oldData);
          console.log("creating new task object");
          console.log(argv[3]);
          const newTask = {
            id: oldData.length + 1,
            description: argv[3],
            status: "todo",
            createdAt: `${year}-${month}-${day}`,
            updatedAt: `${year}-${month}-${day}`,
          };
          console.log(newTask);
          console.log("pushing to data");
          oldData.push(newTask);
          console.log("writing to file");
          writeFile("tasks.json", `${JSON.stringify(oldData)}`, (err) => {
            if (err) {
              console.error("Error appending to file:", err);
              return;
            }
            console.log(`Task added successfully (ID: ${newTask.id})`);
            console.log(oldData);
          });
          break;

        case "list":
          if (!argv[3]) {
            const allData = JSON.parse(data);
            console.log(allData);
            if (allData.length === 0) console.log("No tasks found.");
            allData.forEach((task, index) => {
              console.log(
                `[${index + 1}] ${task.description} — ${
                  task.status
                } (Created: ${task.createdAt})`
              );
            });
          } else {
            switch (argv[3]) {
              case "todo":
                const todoData = JSON.parse(data);
                console.log(todoData);
                if (todoData.length === 0)
                  console.log("No tasks found with status: todo.");
                todoData.forEach((task, index) => {
                  if (task.status === "todo") {
                    console.log(
                      `[${index + 1}] ${task.description} — ${
                        task.status
                      } (Created: ${task.createdAt})`
                    );
                  }
                });
                break;
              case "done":
                const doneData = JSON.parse(data);
                console.log(doneData);
                if (doneData.length === 0)
                  console.log("No tasks found with status: done.");
                doneData.forEach((task, index) => {
                  if (task.status === "done") {
                    console.log(
                      `[${index + 1}] ${task.description} — ${
                        task.status
                      } (Created: ${task.createdAt})`
                    );
                  }
                });
                break;
              case "in-progress":
                const inprogressData = JSON.parse(data);
                console.log(inprogressData);
                if (inprogressData.length === 0)
                  console.log("No tasks found with status: in-progress.");
                inprogressData.forEach((task, index) => {
                  if (task.status === "in-progress") {
                    console.log(
                      `[${index + 1}] ${task.description} — ${
                        task.status
                      } (Created: ${task.createdAt})`
                    );
                  }
                });
                break;

              default:
                console.log(
                  "Invalid status. Use one of: todo, in-progress, done"
                );
                break;
            }
          }
          break;

        case "update":
          const updatedData = JSON.parse(data);
          const currentUpdatedDate = new Date();
          const currentMonth = currentUpdatedDate.getMonth() + 1;
          const currentYear = currentUpdatedDate.getFullYear();
          const currentDay = currentUpdatedDate.getDate();
          let found = false;
          updatedData.forEach((task, index) => {
            if (task.id === Number(argv[3])) {
              found = true;
              task = {
                ...task,
                description: argv[4],
                updatedAt: `${currentYear}-${currentMonth}-${currentDay}`,
              };
              updatedData[index] = task;
              writeFile(
                "tasks.json",
                `${JSON.stringify(updatedData)}`,
                (err) => {
                  if (err) {
                    console.error("Error appending to file:", err);
                    return;
                  }
                  console.log(`Task updated successfully (ID: ${task.id})`);
                }
              );
            }
          });
          if (!found) {
            console.log(`Task not found with ID: ${argv[3]}`);
          }
          break;

        case "delete":
          const deleteData = JSON.parse(data);
          const remainingTasks = [];
          let idFound = false;
          deleteData.forEach((task) => {
            if (task.id !== Number(argv[3])) {
              remainingTasks.push({ ...task });
              writeFile(
                "tasks.json",
                `${JSON.stringify(remainingTasks)}`,
                (err) => {
                  if (err) {
                    console.error("Error appending to file:", err);
                    return;
                  }
                }
              );
            } else if (task.id === Number(argv[3])) {
              idFound = true;
            }
          });
          if (idFound) {
            console.log(`Task deleted successfully (ID: ${argv[3]})`);
          }

          break;

        default:
          console.log("Unknown command!");
          break;
      }
    } catch {
      console.log("Invalid file. Recreating empty tasks.json");
      writeFile("tasks.json", "[]", (err) => {
        if (err) throw err;
        console.log("File content overwritten!");
      });
    }
  }
});

// // print process.argv
// argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });
