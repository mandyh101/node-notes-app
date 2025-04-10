// code for the CLI
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  findNotes,
  getAllNotes,
  newNote,
  removeNote,
  removeAllNotes,
} from "./notes.js";
import { start } from "./server.js";

//helper function to list our notes in the console
const listNotes = (notes) => {
  if (!notes.length) {
    console.log("No notes found");
    return;
  }
  notes.forEach(({ id, content, tags }) => {
    console.log("id: ", id);
    console.log("content: ", content);
    console.log("tags: ", tags);
    console.log("/n");
  });
};

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "Create a new note",
    (yargs) => {
      return yargs.positional("note", {
        type: "string",
        describe: "The content of the note to create",
      });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(",") : [];
      const note = await newNote(argv.note, tags);
      console.log(" new note!", note);
    }
  )
  .option("tag", {
    alias: "t",
    type: "string",
    description: "Tags to add to the note",
  })
  .command(
    "all",
    "get all notes",
    () => {},
    async (argv) => {
      const notes = await getAllNotes();
      listNotes(notes);
    }
  )
  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        type: "string",
        describe: "The search term to filter notes.content by",
      });
    },
    async (argv) => {
      const notes = await findNotes(argv.filter);
      listNotes(notes);
    }
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "string",
        describe: "The id of the note to remove",
      });
    },
    async (argv) => {
      const id = await removeNote(argv.id, getAllNotes());
      console.log("Note removed", id);
    }
  )
  .command(
    "web [port]",
    "Launch the web interface to see notes",
    (yargs) => {
      return yargs.positional("port", {
        type: "number",
        describe: "The port to launch the web interface on",
        default: 3001,
      });
    },
    async (argv) => {
      const notes = await getAllNotes();
      start(notes, argv.port);
      console.log(`Server started on port http://localhost:${argv.port}`);
    }
  )
  .command(
    "clean",
    "Delete all notes",
    () => {},
    async (argv) => {
      await removeAllNotes();
      console.log("All notes deleted!");
    }
  )
  .demandCommand(1)
  .parse();
