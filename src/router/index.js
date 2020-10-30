import { createRouter, createWebHistory } from "vue-router";
import Record from "..//components/Record.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: {}
  },
  {
    path: "/record/:recordId",
    name: "Record",
    component: Record,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
