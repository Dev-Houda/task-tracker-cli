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
      const allData = JSON.parse(data);
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const day = currentDate.getDate();
      switch (argv[2]) {
        case "add":
          const newTask = {
            id: allData.length + 1,
            description: argv[3],
            status: "todo",
            createdAt: `${year}-${month}-${day}`,
            updatedAt: `${year}-${month}-${day}`,
          };
          allData.push(newTask);
          writeFile("tasks.json", `${JSON.stringify(allData)}`, (err) => {
            if (err) {
              console.error("Error appending to file:", err);
              return;
            }
            console.log(`Task added successfully (ID: ${newTask.id})`);
          });
          break;

        case "list":
          if (!argv[3]) {
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
                if (allData.length === 0)
                  console.log("No tasks found with status: todo.");
                allData.forEach((task, index) => {
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
                if (allData.length === 0) {
                  console.log("No tasks found with status: done.");
                } else {
                  allData.forEach((task, index) => {
                    if (task.status === "done") {
                      console.log(
                        `[${index + 1}] ${task.description} — ${
                          task.status
                        } (Created: ${task.createdAt})`
                      );
                    }
                  });
                }
                break;
              case "in-progress":
                if (allData.length === 0)
                  console.log("No tasks found with status: in-progress.");
                allData.forEach((task, index) => {
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
          let found = false;
          allData.forEach((task, index) => {
            if (task.id === Number(argv[3])) {
              found = true;
              task = {
                ...task,
                description: argv[4],
                updatedAt: `${year}-${month}-${day}`,
              };
              allData[index] = task;
              writeFile("tasks.json", `${JSON.stringify(allData)}`, (err) => {
                if (err) {
                  console.error("Error appending to file:", err);
                  return;
                }
                console.log(`Task updated successfully (ID: ${task.id})`);
              });
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
