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
      if (argv[2] === "add") {
        const oldData = JSON.parse(data);
        console.log(oldData);
        console.log("creating new task object");
        console.log(argv[3]);
        const newTask = {
          id: oldData.length + 1,
          description: argv[3],
          status: "todo",
          createdAt: Date.now(),
          updatedAt: Date.now(),
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
