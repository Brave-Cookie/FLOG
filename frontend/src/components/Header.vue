<template>
    <div id='header'> 
        <div id='menuWrap'>
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<!-- scoped 형태로 클래스 선언하면 해당 컴포넌트 내에서만 사용가능  -->
<style>
  #header {
    background-color: #9172F6;
    width:auto;
    height:3rem;
  }

  #menuWrap {
    text-align: right;
    margin-right:1rem;
  }
</style>