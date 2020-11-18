import { createRouter, createWebHistory } from "vue-router";
import Record from "@/views/Record.vue";
import Results from "@/views/Results.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: {},
    props: false,
  },
  {
    path: "/record/:recordId",
    name: "Record",
    component: Record,
    props: true,
  },
  {
    path: "/results",
    name: "Results",
    component: Results,
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

export default router;
