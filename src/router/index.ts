import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import Home from "../views/newDirec/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../layout/index.vue"),
    children: [
      {
        path: "/",
        redirect: "/DefaultPage",
      },
      {
        path: "/aboutUs",
        name: "AboutUs",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../layout/components/AboutUs.vue"
          ),
      },
      {
        path: "/more",
        name: "More",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../layout/components/More.vue"
          ),
      },
      {
        path: "/settings",
        name: "Settings",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../layout/components/Settings.vue"
          ),
      },
      {
        path: "/defaultPage",
        name: "DefaultPage",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/mainDirec/DefaultPage.vue"
          ),
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
          {
            path: "/demoG2Map",
            name: "DemoG2Map",
            component: () => import("../views/childrenTab/demoG2Map.vue"),
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
        path: "/draw",
        name: "Draw",
        component: () => import("../views/secondDirec/draw.vue"),
      },
      {
        path: "/toFly",
        name: "ToFly",
        component: () => import("../views/secondDirec/toFly.vue"),
      },
      {
        path: "/news",
        name: "News",
        component: () => import("../views/secondDirec/news.vue"),
        children: [
          {
            path: "/technologyNews",
            name: "TechnologyNews",
            component: () =>
              import("../views/secondDirec/newsView/technologyNews.vue"),
          },
          {
            path: "/entNews",
            name: "EntNews",
            component: () =>
              import("../views/secondDirec/newsView/entNews.vue"),
          },
          {
            path: "/chinaNews",
            name: "ChinaNews",
            component: () =>
              import("../views/secondDirec/newsView/chinaNews.vue"),
          },
          {
            path: "/sportNews",
            name: "SportNews",
            component: () =>
              import("../views/secondDirec/newsView/sportNews.vue"),
          },
        ],
      },
      {
        path: "/latestMovie",
        name: "LatestMovie",
        component: () => import("../views/secondDirec/latestMovie.vue"),
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
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const getUserInfo = () => {
  console.log("1111");
};
router.beforeEach(async (to) => {// 路由进入前的相关验证，这里同时要注意是否其他地方使用了一个已有路径、未经过登录验证、无token的情况下直接进入页面
  console.log(to.name);
  if (to.name === "Login") {
    return true;
  }
  try {
    // 从服务端处获取到token，进行相关的接口请求，以及判断相关的账户是否注册、密码是否正确
    await getUserInfo();
    return true;
  } catch (error) {
    console.log(error);
    return "/login";
  }
});

export default router;
