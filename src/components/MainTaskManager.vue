<template>

  <div class="nes-container with-title is-rounded container">
    <p class="title" >Списки заданий</p>

    <DialogElement @confirm="dialog.onConfirm" :text="dialog.text" />

    <p class="add-note-container">
      <input type="text" @keypress.enter="createNote()" @show="onShowNotetitleEditor" v-model="inputedTitle" :class="addNoteInputClassName" class="nes-input add-note-input">
      <button @click="createNote()" class="nes-btn add-note-button is-primary" >+Добавить</button>
    </p>

    <div v-if="!notes.list.length" class="nes-container is-centered is-dark">
      <p class='is-centered'>Пока что у вас нет запланированных дел</p>
    </div>
    
    
    <div v-for="(note, key) in notes.list" :key="key">
      <div class="note-container">
        <div class="note">
          <h3><input  :ref="function(el) { onNoteTitleEditorRef(el, note) }" @show="onShowNotetitleEditor" @blur="completeNoteTitleEditing(note, key)" @keydown.enter="completeNoteTitleEditing(note, key)" v-model="note.title" v-show="note.isEditing" type="text"/></h3>
          <h3 v-show="!note.isEditing"  class="note-title">
            <span @click="editNoteTitle(note)">{{note.title}}</span><span class="note-controls">
              <button @click="onNoteDeleteButton(key)" class="note-controls-button delete-todo-button">
                <img width="18" src="@/assets/icons8-delete_sign.png" alt="">
              </button>
              <!-- <button class="note-controls-button edit-todo-button">
                <img width="18" src="@/assets/icons8-edit.png" alt="">
              </button> -->
            </span>
          </h3>
          <div class="todo-container" v-for="(todo, todoKey) in note.todos" :key="todoKey">
            <label class="todo">
              <input 
                type="checkbox" 
                v-model="todo.checked"
                @change="onTodoChange(key, todoKey, todo)"
                class="nes-checkbox">
              <span 
                class="todo-text"
                :style="{
                  textDecoration: todo.checked ? 'line-through 3px black' : 'none'
                }" 
              >
                <span v-show="!todo.isEditing" class="todo-text-inner" >{{todo.text}}</span>
                <button v-show="!todo.isEditing" @click="onEditTodoButtonClick(todo)" class="edit-todo-button"><img src="@/assets/icons8-edit.png" alt=""></button><!-- 
                --><input
                  v-show="todo.isEditing" 
                  :ref="function(el) {
                    todo.ref = el;
                  }"
                  class="edit-todo-input"
                  type="text"
                  v-model="todo.text" 
                  @keypress.enter="onCompleteTodoEditing(key, todoKey, todo)" 
                  @blur="onCompleteTodoEditing(key, todoKey, todo)"
                >
              </span>
              
            </label>
          </div>
        </div>

        <p class="add-todo">
          <span class="plus-icon"></span>
          <input 
            :ref="function(ref) {
              note.addTodoInputRef = ref;
            }" 
            class="add-todo-input" 
            @keydown.enter="newTodoOnEnter(note, key)" 
            v-model="note.newTodo" 
            placeholder="Добавить">
        </p>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
import DialogElement from '@/components/DialogElement'
import * as api from '@/api.js'
export default {
  name: 'MainTaskManager',
  components: {
    DialogElement
  },

  props: {
    notesFrom: {
      type: Number,
      default: 0,
      required: false
    },

    notesNumber: {
      type: Number,
      default: null,
      required: false
    }
  },

  data() {
    return {
      notes: this.initNotes(),
      inputedTitle: '',
      inputedTodos: '',
      newTodo: '',
      addNoteInputClassName: '',
      dialog: {
        text: 'default Dialog Text',
        onConfirm: null,
        onCancel: null
      }
      
    }
  },

  watch: {
    notesFrom() {
      this.notes = this.initNotes();
    },

    notesNumber() {
      this.notes = this.initNotes();
    }
  },

  methods: {
    onCompleteTodoEditing(noteKey, todoKey, todo) {
      if(todo.text == '') {
        this.notes.list[noteKey].todos.splice(todoKey, 1);
        todo.isEditing = false;
        api.deleteTodo(noteKey, todoKey)
      } else {
        todo.isEditing = false;
        api.updateTodo(noteKey, todoKey, todo)
      }
      
    },

    onEditTodoButtonClick(todo) {
      todo.isEditing = true;
      this.$nextTick(() => {
        todo.ref.focus();
        todo.ref.select();
      })
    },

    onNoteTitleEditorRef(el, note) {
      note.ref = el;
    },

    completeNoteTitleEditing(note, noteKey) {
      if(note.title !== '') {
        note.isEditing = false
        api.updateNoteTitle(noteKey, note.title);
      }
      
    },

    editNoteTitle(note){
      note.isEditing = true;
      this.$nextTick(() => {
        note.ref.focus();
        note.ref.select();
      })
    },

    deleteNote(key) {
      this.notes.list.splice(key, 1)
      // api.deleteNote(this.currentPage - 1 + key);
      this.$emit('delete-note', key);
    },

    onNoteDeleteButton(key) {
      this.dialog.text = 'Вы действительно хотите удалить список?'
      this.dialog.onConfirm = () => {
        this.deleteNote(key);
      }
      document.getElementById('dialog').showModal();
    }, 

    onTodoChange(noteKey, todoKey, todo) {
      api.updateTodo(noteKey, todoKey, todo);
    },

    newTodoOnEnter(note, key) {

      if(!note.newTodo) return
      note.todos.push({
        text: note.newTodo,
        checked: false
      });
      api.addTodo(key, note.newTodo)
      note.newTodo = '';
    },
    
    initNotes() {
      const notesFromApi = api.getNotes(this.notesFrom, this.notesNumber);
      let notes = {
        list: notesFromApi,
        newNote: {
          title: '',
          todos: []
        }
      }

      return notes;
    },

    createNote() {
      if(!this.inputedTitle) {
        this.addNoteInputClassName = 'is-error'
        return;
      } else {
        this.addNoteInputClassName = ''
      }

      let title = this.inputedTitle;
      
      let todos = [];
      this.notes.list.unshift({
        title,
        todos
      })

      api.createNote({
        title,
      })

      this.$emit('createNote')

      this.inputedTitle = '';

      this.$nextTick(() => {
        // note.addTodoInputRef.focus();
        this.notes.list[0].addTodoInputRef.focus();
      })
    },

    onNewTodoInput(elem) {
      this.newTodo = elem.target.innerText;
    },

    removeAllNotes() {
      api.removeAllNotes();
    }
  },
}
</script>

<style>
.add-note-container {
  display: flex;
  gap: 10px;
}

input {
  width: 100%;
}

hr {
  border: 2px dotted #ddd;
}

.title {
  text-transform: uppercase;
}

.note h3 {
  /* color: red */
}

.note:hover .note-controls {
  opacity: 1;;
}

.note-controls-button {
  padding: 0;
  margin: 0;
}

.note-controls-button img {
  margin-top: 5px;
  vertical-align: top;
}


.note-controls {
  margin-left: 5px;
  opacity: 0;
}

.delete-todo-button {
  padding: 0;
  border: none;
  background: none;
}

.delete-todo-button img {
  /* margin: 0; */
  vertical-align: top;
}

.add-todo {
  display: flex;
  flex-direction: row;
}

.add-todo-input {
  border: none;
  overflow: hidden;
}

.add-todo-input[contenteditable]:empty::before {
  content: "placeholder";
  color: gray;
}

.todo {
  display: flex;
  flex-direction: row;
  /* width: 100%; */
  width: 100%;
}

.todo-text {
  width: 100%; 
}

.plus-icon {
  width: 18px;
  height: 18px;
  display: inline-block;
  background-image: url('../assets/icons8-plus.png');
  background-size: cover;
  margin-left: 3px;
  margin-right: 5px;
  opacity: 0.5;
  vertical-align: top;
  margin-top: 5px;
  min-width: 18px;
}

.edit-todo-button {
  height: 18px;
  width: 18px;
  padding: 0;
  position: relative;
  vertical-align: top;
  margin-left: 0;
  opacity: 0;
  border: none;
  background-color: #999;
  border-radius: 10000px;

  position: absolute;
  margin-left: 4px;
  margin-top: 2.3px;
}

.todo:hover .edit-todo-button {
  opacity: 1;
  
}

.edit-todo-button img{
  width: 70%;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 15%;
  left: 15%;
}

</style>
