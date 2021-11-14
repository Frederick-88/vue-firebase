import { initializeApp } from "@firebase/app";
import firebase from "firebase/compat/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDtzjuQCr1fmexz0OkHjFqDFFbkWWKOv_c",
//   authDomain: "vue-firebase-todoapp-3a77a.firebaseapp.com",
//   projectId: "vue-firebase-todoapp-3a77a",
//   storageBucket: "vue-firebase-todoapp-3a77a.appspot.com",
//   messagingSenderId: "20105088140",
//   appId: "1:20105088140:web:7ee738fd38c0d2bf83bfa9",
// };

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDtzjuQCr1fmexz0OkHjFqDFFbkWWKOv_c",
  authDomain: "vue-firebase-todoapp-3a77a.firebaseapp.com",
  projectId: "vue-firebase-todoapp-3a77a",
  storageBucket: "vue-firebase-todoapp-3a77a.appspot.com",
  messagingSenderId: "20105088140",
  appId: "1:20105088140:web:7ee738fd38c0d2bf83bfa9",
});

// const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = getFirestore();
// const database = getFirestore(firebaseApp);
const todolistCollection = collection(database, "todolist");
const getTodolistDatabase = getDocs(todolistCollection);

const createTodoList = (todoTask) => {
  // console.log("create", todo);
  return addDoc(todolistCollection, {
    todo: todoTask,
  });
};

const updateTodoList = (todoId, todo) => {
  return todolistCollection.doc(todoId).update(todo);
};

const deleteTodoList = (todoId) => {
  return todolistCollection.doc(todoId).delete();
};

export {
  database,
  todolistCollection,
  getTodolistDatabase,
  createTodoList,
  updateTodoList,
  deleteTodoList,
};
