<template>
  <div id="nav">
      <!-- 아래서 불러온 컴포넌트 별명대로 쓰면됨. -->
    <Header />
    <br>
  <router-view>
  </router-view>
  </div>

</template>

<script>
// 컴포넌트 등록
import Header from '@/components/Header.vue';
export default {
  name: 'App',
  components: {
    Header,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #7b68ee;
}

</style>
