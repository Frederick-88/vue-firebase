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
const storageRef = firebase.storage().ref();

// -----------------
// Todo List Section
// -----------------
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

// ------------------------
// Customer Records Section
// ------------------------
const customerRecordsCollection = database.collection("customer-records");

const createCustomerRecord = (recordObj) => {
  customerRecordsCollection.add({
    name: recordObj.name,
    email: recordObj.email,
    phone_number: recordObj.phone_number,
    image_url: recordObj.image_url
  });
};

const updateCustomerRecord = (customerId, recordObj) => {
  customerRecordsCollection.doc(customerId).update({
    name: recordObj.name,
    email: recordObj.email,
    phone_number: recordObj.phone_number,
    image_url: recordObj.image_url
  });
};

const deleteCustomerRecord = (customerId) => {
  customerRecordsCollection.doc(customerId).delete();
};
// -----------------
// -----------------

export {
  database,
  storageRef,
  createTodoList,
  updateTodoList,
  deleteTodoList,
  createCustomerRecord,
  updateCustomerRecord,
  deleteCustomerRecord,
};
