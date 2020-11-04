import { createRouter, createWebHistory } from "vue-router";
import Record from "@/views/Record.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: {},
    props: false
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