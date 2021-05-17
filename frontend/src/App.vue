<template>
    <div id="app">
      <div id="header">
        <component :is="getIsAuth() ? 'HeaderAuth' : 'Header'"></component> 
      </div>
  <router-view>
  </router-view>
  </div>

</template>

<script>
import Header from './components/Header.vue'
import HeaderAuth from './components/HeaderAuth.vue'

export default {
  name: 'app',
  components: {
    Header, 
    HeaderAuth
  },
  methods: {
    getIsAuth() {
      if(localStorage.accessToken){
        return 1;
      }
      else{
        return 0;
      }
      
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0px;
  color: #293046;
}


#header a {
  font-weight: bold;
  color: #FFFFB9;
}

#header a.router-link-exact-active {
  color: #6D42F8;
}

</style>