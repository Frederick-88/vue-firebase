<template>
  <div class="home container">
    <h2 class="mb-4">Todoapp created with Vue.js & Firebase</h2>
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Todo Task</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in todolistDatabase" :key="todo.task">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ todo.task }}</td>
          <td>
            <button
              type="button"
              class="btn btn-outline-warning me-3"
              @click="startEdit(todo)"
            >
              Edit
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="deleteTodo(todo.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mt-4">
      <h3 class="mb-3">Todoapp Form</h3>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="To Do Task"
          v-model="todoInput"
          @keyup.enter="onKeypressEnter"
        />
        <div class="input-group-append">
          <button
            v-if="!isEditingTodo"
            class="btn btn-outline-success"
            type="button"
            @click="createTodo"
          >
            Add Todo
          </button>
          <button
            v-if="isEditingTodo"
            class="btn btn-outline-success"
            type="button"
            @click="updateTodo"
          >
            Edit Todo
          </button>
          <button
            v-if="isEditingTodo"
            class="btn btn-dark"
            type="button"
            @click="cancelEdit"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  database,
  createTodoList,
  updateTodoList,
  deleteTodoList,
} from "../firebase/db";

export default {
  name: "Todoapp",
  data() {
    return {
      todolistDatabase: [],
      todoInput: "",
      activeEditTodoId: -1,
    };
  },
  computed: {
    isEditingTodo() {
      return this.activeEditTodoId !== -1;
    },
  },
  methods: {
    async createTodo() {
      if (!!this.todoInput) {
        await createTodoList(this.todoInput);
        this.resetForm();
      }
    },
    async updateTodo() {
      if (!!this.todoInput) {
        await updateTodoList(this.activeEditTodoId, this.todoInput);
        this.resetForm();
      } else {
        this.resetForm();
      }
    },
    async deleteTodo(todoId) {
      await deleteTodoList(todoId);
    },

    onKeypressEnter() {
      if (this.isEditingTodo) this.updateTodo();
      else this.createTodo();
    },
    startEdit(todoObj) {
      this.todoInput = todoObj.task;
      this.activeEditTodoId = todoObj.id;
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.todoInput = "";
      this.activeEditTodoId = -1;
    },
  },
  firestore: {
    todolistDatabase: database.collection("todolist"),
  },
};
</script>
