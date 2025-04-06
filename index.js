#!/usr/bin/env node
console.log(process.argv)

// initialise our note variable as the third argument passed into the process args property.
// first arg is always the absolute path to the Node.js executable (e.g., /Users/myname/.nvm/versions/node/v21.7.3/bin/node).
// second arg is always the absolute path to the JavaScript file being executed (e.g., /Users/myname/.nvm/versions/node/v21.7.3/bin/notes-app).
const note = process.argv[2]
//our data model
const newNote = {
  content: note,
  id: Date.now()
}