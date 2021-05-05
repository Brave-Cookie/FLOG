<template>
    <p>next2.vue</p>
    <br>

    <button v-on:click='test'>
        데이터 테스트
    </button>
    <br>
    {{a}}
</template>

<script>
export default {

   data() {
       return { 
           a: 1 
           }
    },

    methods: {
        test() {
          this.a += 1
        }
      }
   
}
</script>

<style>
</style>
