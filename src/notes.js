import { insertDB, saveDB, getDB } from "./db.js";

/**
 * Adds a new note to the database.
 * @param {string} note The content of the note to add.
 * @param {string[]} tags The tags to add to the note.
 * @returns {Promise<Object>} The newly added note.
 */
export const newNote = async(note, tags) => {
  const newNote = {
    id: Date.now().toString(),
    content: note,
    tags: tags
  }

  await insertDB(newNote);
  return newNote
}

/**
 * Retrieves all notes from the database.
 * @returns {Promise<Object[]>} A promise that resolves to an array of note objects.
 */

export const getAllNotes = async() => {
  //destructure the returned db object to just get the notes
  const {notes} = await getDB();
  return notes
}

/**
 * Searches all notes in the database by content.
 * @param {string} filter The string to search for in the note content.
 * @returns {Promise<Object[]>} A promise that resolves to an array of note objects that match the filter.
 */
export const findNotes = async (filter) => {
  const {notes} = await getDB();
  return notes.filter(note => note.content.toLowerCase().includes(filter))
}

/**
 * Removes a note from the database.
 * @param {number} id The id of the note to remove.
 * @returns {Promise<Object[]|undefined>} A promise that resolves to an array of remaining note objects if the note existed, or undefined if the note didn't exist.
 */
export const removeNote = async (id) => {
  
  //first get all the notes in js array
  const notes = await getAllNotes();
  //then check with find if we have a note that matches the given id
  const match = await notes.find(note => note.id === id);
  // if we do then use filter to create a new array with the matching nte filtered out
  if(match){
    const filteredNotes = notes.filter(note => note.id !== id);
    //save the filtered notes array to the db
    await saveDB({notes: filteredNotes});
    return filteredNotes
  } else{
    console.log("A note with that id does not exist.")
  }
}

/**
 * Removes all notes from the database.
 * @returns {Promise<Object>}
 */
export const removeAllNotes = () => saveDB({notes: []})