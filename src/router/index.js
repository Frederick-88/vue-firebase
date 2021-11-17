import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Todoapp from "../views/Todoapp.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/todoapp",
    name: "Todoapp",
    component: Todoapp,
  },
  {
    path: "/customer-records",
    name: "CustomerRecords",
    // route level code-splitting
    // this generates a separate chunk (customer-records.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "customer-records" */ "../views/CustomerRecords.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
