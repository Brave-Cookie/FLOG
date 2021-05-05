<template>

  <!-- 아래서 불러온 컴포넌트 별명대로 쓰면됨. -->
  <Header />
  <br>

  <div class='container'>
    <router-view></router-view>
  </div>
    
</template>


<script>
// 헤더 컴포넌트를 불러온다
import Header from "./components/header.vue";

export default {
  // 이 폴더의 별명 지정(필수아님)
  name: 'App',
  // 추가로 참조할 컴포넌트 추가
  components: {
    Header,
  }
}
</script>

<style>
.container{
  border :1px solid black;
  margin:0 4rem 0 4rem;
}
</style>
