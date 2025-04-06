import { insertDB, saveDB, getDB } from "./db";

const newNote = async(note, tags) => {
  const newNote = {
    id: Date.now(),
    content: note,
    tags: tags
  }

  await insertDB(newNote);
  return newNote
}

export const getAllNotes = async() => {
  //destructure the returned db object to just get the notes
  const {notes} = await getDB();
  return notes
}

export const findNotes = async(filter) => {
  const {notes} = await getDB();
  return notes.filter(note => note.content.toLowerCase().includes(filter))
}

export const removeNote = async(id) => {
  //first get all the notes in js array
  const {notes} = await getAllNotes();
  //then check with find if we have a note that matches the given id
  const match = notes.find(note => note.id === id);
  // if we do then use filter to create a new array with the matching nte filtered out
  if(match){
    const filteredNotes = notes.filter(note => note.id !== id);
    //save the filtered notes array to the db
    await saveDB({notes: filteredNotes});
    return filteredNotes
  } else{
    console.log("A note with that id does not exist.")
    return
  }
}

export const removeAllNotes = () => saveDB({notes: []})