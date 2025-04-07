# node-notes-app

A CLI based Note taking app built with Node.js

## Getting started

Run `npm link` to install the notes-app cli in this project inside the bin folder in your computer.

- type `which notes-app` to confirm you have access to the notes-app cli in your bin folder.

### start the server

`npm run start`

### CLI Commands

Once linked, you can begin using the CLI with `notes-app` as your prefix. e.g. running `notes-app` in the terminal will execute your javascipt file with node.

- `notes-app --help` to see a list of available commands and options
- `notes-app new` + "note content" : creates a new note. Option to tag the note into a category with `--tag`
- `notes-app all` : fetches all notes
- `notes-app find` + "filter" : keywords to search note content by
- `notes-app remove`+ id : delete a note by id
- `notes-app clean` : deletes all notes
- `notes-app web`+ port: launches web interface for viewing notes
