<template>
  <!--  <div id="nav">-->
  <!--    &lt;!&ndash;    <router-link to="/checkRoute">checkRoute</router-link> |&ndash;&gt;-->
  <!--    &lt;!&ndash;    <router-link to="/about">About</router-link> |&ndash;&gt;-->
  <!--    &lt;!&ndash;    <router-link to="/helloWorld">HelloWorld</router-link>&ndash;&gt;-->
  <!--    <router-view />-->
  <!--  </div>-->
  <router-view />
</template>

<style lang="stylus">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
