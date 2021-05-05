<template>

    <p>chk_db.vue</p>
    <br>
    <button v-on:click='test'>
        api로 db 전송받기
    </button>
    <br>
    <br>
    {{result}}
</template>

<script>
export default {
   data() {
     return {
       result : {}
     }
  },

  methods: {
        test() {
          // backend api에서 데이터를 요청 -> json형식으로 받음.
          this.axios.post('/api/test/chk_DB').then(
        (res) => { this.result = res.data }
        )}
  }
  
}
</script>

<style>
</style>
