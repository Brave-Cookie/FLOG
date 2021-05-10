<template>
  <div id = 'body'>
    <h2 id='name'>FLOG</h2>

    <router-link to="/login">시작하기</router-link>
  </div>
</template>

<script>
  // import axios from "axios"

  export default {
    /*data() {
      return {
        greeting: "",
      }
    },
    created() {
      axios
        .get("flog.cdamle1eaipy.ap-northeast-2.rds.amazonaws.com")
        .then(result => (this.greeting = result.data.greeting))
    },*/
  }
</script>

<style scoped>
  #body {
    
  }
  #name {
    color: #6D43F3;
  }
</style>