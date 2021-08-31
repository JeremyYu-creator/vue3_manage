import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/newDirec/Home.vue";

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
          import(/* webpackChunkName: "about" */ "../views/newDirec/About.vue"),
      },
      {
        path: "/checkRoute",
        name: "CheckRoute",
        component: () => import("../views/newDirec/checkRoute.vue"),
      },
      {
        path: "/home",
        name: "Home",
        component: () => import("../views/newDirec/Home.vue"),
      },
      {
        path: "/helloWorld",
        name: "HelloWorld",
        component: () => import("../components/HelloWorld.vue"),
      },
      {
        path: "/mapShow",
        name: "MapShow",
        component: () => import("../views/secondDirec/mapShow.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
