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
      console.log(data);
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
          const allData = JSON.parse(data);
          console.log(allData);
          if (allData.length === 0) console.log("No tasks found.");
          allData.forEach((task, index) => {
            console.log(
              `[${index + 1}] ${task.description} — ${task.status} (Created: ${
                task.createdAt
              })`
            );
          });
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
