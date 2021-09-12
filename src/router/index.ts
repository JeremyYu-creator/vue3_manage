import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import Home from "../views/newDirec/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../layout/index.vue"),
    children: [
      {
        path: "/",
        redirect: "/About",
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
        children: [
          {
            path: "/demoBar",
            name: "DemoBar",
            component: () => import("../views/childrenTab/demoBar.vue"),
          },
          {
            path: "/demoLine",
            name: "DemoLine",
            component: () => import("../views/childrenTab/demoLine.vue"),
          },
          {
            path: "/demoMap",
            name: "DemoMap",
            component: () => import("../views/childrenTab/demoMap.vue"),
          },
          {
            path: "/demoPie",
            name: "DemoPie",
            component: () => import("../views/childrenTab/demoPie.vue"),
          },
        ],
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
      {
        path: "/toFly",
        name: "ToFly",
        component: () => import("../views/secondDirec/toFly.vue"),
      },
      {
        path: "/404",
        name: "404",
        component: () => import("../views/secondDirec/error.vue"),
      },
      {
        path: "/:pathMatch(.*)",
        redirect: "/404",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
