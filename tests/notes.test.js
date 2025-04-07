import { jest } from "@jest/globals";

//mock our db functions with jest o avoid writing test data to the db
jest.unstable_mockModule("../src/db.js", () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import("../src/db.js");
const { newNote, getAllNotes, removeNote } = await import("../src/notes.js");

//use beforeEach to clear all mocks before each test so we have a fresh mock instance ready and clear any state
beforeEach(() => {
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

test("newNote inserts note data and returns it", async () => {
  const newNoteData = {
    id: "1",
    content: "test note",
    tags: ["test"],
  };
  insertDB.mockResolvedValue(newNoteData);
  const result = await newNote(newNoteData.content, newNoteData.tags);
  expect(result.content).toEqual(newNoteData.content);
  expect(result.tags).toEqual(newNoteData.tags);
  expect(typeof result.id).toBe("string");
});

test("getAllNotes returns all notes", async () => {
  //GIVEN: mock an array of notes
  const db = {
    notes: ["note1", "note2", "note3"],
  };
  //WHEN: mock the db function to return the mock db
  getDB.mockResolvedValue(db);
  //THEN
  const result = await getAllNotes();
  expect(result).toEqual(db.notes);
  expect(result.length).toBe(3);
});

test("removeNote does not remove a note if the id does not exist", async () => {
  //GIVEN: mock an array of notes with ids
  const notes = [
    { id: "1", content: "note1" },
    { id: "2", content: "note2" },
    { id: "3", content: "note3" },
  ];

  const mockGetAllNotes = jest.fn().mockResolvedValue(notes);
  //and given an id to remove
  const idToDelete = "4";
  // WHEN remove note is called
  const result = await removeNote(idToDelete, mockGetAllNotes);
  //THEN: result should be undefined and theres hould still be three notes
  expect(result).toBeUndefined();
  expect(notes.length).toBe(3);
});

test("removeNote removes a note if the id exists", async () => {
  // GIVEN: Mock the database call (getDB)
  const mockNotes = [
    { id: "1", content: "note1" },
    { id: "2", content: "note2" },
    { id: "3", content: "note3" },
  ];
  const mockGetAllNotes = jest.fn().mockResolvedValue(mockNotes);

  // Mock saveDB (no-op for now)
  saveDB.mockResolvedValue();

  //given an id to remove
  const idToDelete = "2";
  // WHEN remove note is called
  const result = await removeNote(idToDelete, mockGetAllNotes);
  // THEN: Check that the result does not contain the deleted note
  expect(result.some((note) => note.id === idToDelete)).toBe(false);

  // Verify saveDB was called with the correct filtered notes
  expect(saveDB).toHaveBeenCalledWith({
    notes: [
      { id: "1", content: "note1" },
      { id: "3", content: "note3" },
    ],
  });
});
