<template>
  <router-view id="app" :key="$route.fullPath"></router-view>
</template>

<style>





#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

  html,body{
    height: 100%;
  }
</style>
