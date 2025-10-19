import { readFile, writeFile } from "node:fs";

readFile("./tasks.json", "utf8", (err, data) => {
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
      JSON.parse(data);
      console.log(JSON.parse(data));
    } catch {
      console.log("Invalid file. Recreating empty tasks.json");
      writeFile("tasks.json", "[]", (err) => {
        if (err) throw err;
        console.log("File content overwritten!");
      });
    }
  }
});
