import fs from 'node:fs/promises';
const DB_PATH =  new URL('../db.json', import.meta.url).pathname;

/**
 * Reads the contents of the database file and returns its contents
 * as a parsed JSON object.
 * @returns {Promise<Object>} The contents of the database as a JSON object.
 */
export const getDB = async() => {
  const db = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(db);
}

/**
 * Writes the given database object to the database file.
 * @param {Object} db The database object to save.
 * @returns {Promise<Object>} The saved database object.
 */
export const saveDB = async(db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2)); //formatted so everything is spaced by two spaces
  return db
}

/**
 * Adds a note to the database.
 * @param {Object} item The item to add to the database. It is note for our app, but making the args generic for scaling the app and resuing these db functions later.
 * @returns {Promise<Object>} The newly added note.
 */
export const insertDB = async(item) => {
  //get the db as a javascript array
  const db = await getDB();
  //push the note to the database
  db.notes.push(item);
  // save the db array back to json in the db
  await saveDB(db);
  return item
}