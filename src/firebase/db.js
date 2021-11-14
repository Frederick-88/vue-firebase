import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtzjuQCr1fmexz0OkHjFqDFFbkWWKOv_c",
  authDomain: "vue-firebase-todoapp-3a77a.firebaseapp.com",
  projectId: "vue-firebase-todoapp-3a77a",
  storageBucket: "vue-firebase-todoapp-3a77a.appspot.com",
  messagingSenderId: "20105088140",
  appId: "1:20105088140:web:7ee738fd38c0d2bf83bfa9",
};

const database = firebase.initializeApp(firebaseConfig).firestore();
const todolistCollection = database.collection("todolist");

const createTodoList = (todoTask) => {
  todolistCollection.add({
    task: todoTask,
  });
};

const updateTodoList = (todoId, todoTask) => {
  todolistCollection.doc(todoId).update({
    task: todoTask,
  });
};

const deleteTodoList = (todoId) => {
  todolistCollection.doc(todoId).delete();
};

export { database, createTodoList, updateTodoList, deleteTodoList };
