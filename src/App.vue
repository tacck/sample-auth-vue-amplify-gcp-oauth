<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      | <router-link to="/information">Informations</router-link>
      <span v-if="$store.state.user === null">
        | <router-link to="/signin">Sign In</router-link>
      </span>
      <span v-else> | <router-link to="/signout">Sign Out</router-link></span>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
