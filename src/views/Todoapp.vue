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
        <tr v-for="(todo, index) in todolistDatabase" :key="todo">
          <th scope="row">{{ index }}</th>
          <td>{{ todo }}</td>
          <td class="d-flex">
            <button type="button" class="btn-outline-warning">Edit</button>
            <button type="button" class="btn-outline-danger">Delete</button>
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
          @keyup.enter="addTodoList"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-success"
            type="button"
            @click="addTodoList"
          >
            Add Todo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTodolistDatabase, createTodoList } from "../firebase/db";

export default {
  name: "Todoapp",
  data() {
    return {
      todoInput: "",
    };
  },
  computed: {
    todolistDatabase() {
      return getTodolistDatabase;
    },
  },
  methods: {
    async addTodoList() {
      if (!!this.todoInput) {
        await createTodoList(this.todoInput);
        this.todoInput = "";
      }
    },
  },
};
</script>
