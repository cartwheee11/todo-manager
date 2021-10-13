export function createNote(opts = {}) {
  const defs = {
    title: null,
    todos: [],
  };

  let note = Object.assign(defs, opts);
  note.todos = note.todos.map(elem => {
    return {
      text: elem,
      checked: false
    }
  })

  let notes = JSON.parse(window.localStorage.getItem("notes")) || [];

  notes.unshift(note);
  window.localStorage.setItem('notes', JSON.stringify(notes));
}

export function getNotes(from = 0, len) {
  const allNotes = JSON.parse(window.localStorage.getItem("notes"));

  if(!allNotes) {
    return [];
  }

  if(!len) {
    len = allNotes.length - from;
  }

  let to = from + len;
  if(to >= allNotes.length) {
    to = allNotes.length;
  }

  const notes = allNotes.slice(from, to);

  return notes;
}

export function removeAllNotes() {
  window.localStorage.clear();
}


export function addTodo(key, todoText) {
  let notes = getNotes();

  notes[key].todos.push({
    text: todoText,
    checked: false
  })

  window.localStorage.setItem('notes', JSON.stringify(notes))
}

export function updateTodo(noteKey, todoKey, todo) {
  let notes = getNotes();
  notes[noteKey].todos[todoKey] = todo;

  window.localStorage.setItem(
    'notes',
    JSON.stringify(notes)
  );
}

export function deleteNote(key) {
  let notes = getNotes();
  notes.splice(key, 1)

  window.localStorage.setItem('notes', JSON.stringify(notes));
}

export function updateNoteTitle(noteKey, newTitle) {
  let notes = getNotes();
  notes[noteKey].title =  newTitle;
  window.localStorage.setItem('notes', JSON.stringify(notes));
}

export function deleteTodo(noteKey, todoKey) {
  let notes = getNotes();
  notes[noteKey].todos.splice(todoKey, 1);
  window.localStorage.setItem("notes", JSON.stringify(notes));
}

export function getNotesNumber() {
  return getNotes().length;
}