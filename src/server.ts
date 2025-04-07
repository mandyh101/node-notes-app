import fs from "node:fs/promises";
import http from "node:http";
import open from "open";
import { Note } from "./db.ts";

// TODO export functions to be able to test them

/**
 * Replaces placeholders in an HTML string with values from a data object.
 * The placeholders should be in the format {{key}}. The function will replace
 * the placeholder with the value from the data object that has the same key.
 * If the key does not exist in the data object, the function will leave the
 * placeholder unchanged.
 *
 * @param {string} html - The HTML string to interpolate.
 * @param {Object} data - The data object to use for interpolation.
 * @returns {string} The interpolated HTML string.
 */
const interpolate = (html:string, data: Record<string, string>): string => {
  //replaces {{notes}} n our template with data.notes from our db
  //this is a simple templating engine that replaces placeholders with data
  //the regex looks for {{ and }} and captures the word inside
  //it then replaces the placeholder with the value from the data object
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
    return data[placeholder] || "";
  });
};

/**
 * Formats an array of notes into HTML.
 *
 * The function takes an array of note objects and maps each one into an HTML
 * string. The HTML string contains a div with class "note" and a child p tag
 * with the note's content. It also contains a child div with class "tags" and
 * one or more child span tags with class "tag" and the note's tags as text.
 *
 * @param {Object[]} notes - The array of notes to format.
 * @returns {string} The formatted HTML string.
 */
const formatNotes = (notes: Note[]): string => {
  return notes
    .map((note) => {
      return `
      <div class="note">
        <p>${note.content}</p>
        <div class="tags">
          ${note.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </div>
    `;
    })
    .join("\n");
};

/**
 * Creates an HTTP server that serves a formatted HTML page with notes.
 *
 * The server reads an HTML template from the filesystem, interpolates it with
 * formatted notes data, and responds to incoming requests with the resulting HTML.
 *
 * @param {Object[]} notes - The array of notes to include in the HTML response.
 * Each note object should have a `content` property and a `tags` property.
 * @returns {http.Server} An instance of the HTTP server.
 */
const createServer = (notes: Note[]): http.Server => {
  return http.createServer(async (req, res) => {
    const HTML_PATH = new URL("./template.html", import.meta.url).pathname;
    const template = await fs.readFile(HTML_PATH, "utf-8");
    const html = interpolate(template, { notes: formatNotes(notes) });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });
};

/**
 * Starts an HTTP server that serves a formatted HTML page with notes.
 *
 * The function creates a server instance with the given notes and listens on
 * the given port. When the server is ready, it opens the URL in the default
 * browser automatically using the open package.
 *
 * @param {Object[]} notes - The array of notes to include in the HTML response.
 * Each note object should have a `content` property and a `tags` property.
 * @param {number} port - The port to listen on.
 */
export const start = (notes: Note[], port: number): void => {
  const server = createServer(notes);
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
  open(`http://localhost:${port}`);
};
