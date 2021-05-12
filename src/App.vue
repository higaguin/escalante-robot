<template>
  <div id="app">
    <!-- <Home /> -->
    <router-view />
  </div>
</template>

<script>
import Home from "./views/Home.vue";

export default {
  components: {
    Home,
  },
};
</script>

<style>
html,
body,
#app,
canvas {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

#app {
  position: absolute;
  z-index: 2;
}

.glCanvas {
  position: absolute;
  width: auto !important;
}
</style>
