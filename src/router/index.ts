import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../layout/index.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
      },
      {
        path: "/checkRoute",
        name: "checkRoute",
        component: () => import("../views/checkRoute.vue"),
      },
      {
        path: "/home",
        name: "home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/helloWorld",
        name: "helloWorld",
        component: () => import("../components/HelloWorld.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
