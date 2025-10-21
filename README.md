# 📝 Task Tracker CLI

A simple command-line Task Tracker built with Node.js.
It allows you to add, list, update, delete, and mark tasks as done or in-progress — all stored locally in a JSON file.

## 🚀 Features

➕ Add tasks with descriptions

📋 List all tasks

🖊️ Update task descriptions

❌ Delete tasks by ID

✅ Mark tasks as done or in-progress

💾 Data persistence using a tasks.json file

## ⚙️ Installation

Make sure you have Node.js installed.

Clone this repository or download the files.

Run in your terminal:

npm init -y


Create an empty file named tasks.json in the same directory:

[]

## 💡 Usage

Run the CLI using Node.js:

Add a task:
node index.js add "Buy milk"

List all tasks:
node index.js list

Update a task:
node index.js update 1 "Buy coffee instead"

Delete a task:
node index.js delete 1

Mark task as done:
node index.js mark-done 2

Mark task as in-progress:
node index.js mark-in-progress 3

## 📁 File Structure
task-tracker/
│
├── index.js        # Main logic
├── tasks.json      # Task data storage
└── README.md       # Documentation

## 👩‍💻 Author

Houda (Dev-Houda)
Fullstack Developer | MERN Stack | Node.js Enthusiast
💼 LinkedIn: https://www.linkedin.com/in/devhouda/
