# node-notes-app

A CLI based Note taking app built with Node.js.

## Learning objectives

- [x] node.js fundamentals
- [x] basic vanilla server fundamentals

## Getting started

Run `npm link` to install the notes-app cli in this project inside the bin folder in your computer.

- type `which notes-app` to confirm you have access to the notes-app cli in your bin folder.

### CLI Commands

Once linked, you can begin using the CLI with `notes-app` as your prefix. e.g. running `notes-app` in the terminal will execute your javascipt file with node.

- `notes-app --help` to see a list of available commands and options
- `notes-app new` + "note content" : creates a new note. Option to tag the note into a category with `--tag`
- `notes-app all` : fetches all notes
- `notes-app find` + "filter" : keywords to search note content by
- `notes-app remove`+ id : delete a note by id
- `notes-app clean` : deletes all notes
- `notes-app web`+ port: launches web interface for viewing notes
- `notes-app web` to launch the server and view notes in web interface (option to pass a port arg otherwise defualts to port 3001: http://localhost:3001 )

## Todos

- add css to style notes
- implement ts with node
- replace vanilla server with express
- replace fs db with prisma db
