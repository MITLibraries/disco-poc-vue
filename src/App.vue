<template>
  <div id="app">
    <Breadcrumb msg="This is the breadcrumb." />
    <img alt="Vue logo" src="./assets/logo.png" />
  </div>
</template>

<script>
import Breadcrumb from "./components/Breadcrumb.vue";

export default {
  name: "App",
  components: {
    Breadcrumb
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.component {
  border: 5px solid black;
}
</style>
