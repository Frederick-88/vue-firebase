<template>
  <div id="app">
    <img class="app-logo" src="https://i.ytimg.com/vi/Htt8AKeF1Kw/maxresdefault.jpg" alt="app-logo" />

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/todoapp">Todo App</router-link> |
      <router-link to="/customer-records"
        >Customer Records with Image Hosting</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .app-logo {
    width: 200px;
    position: absolute;
    left: 0;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
