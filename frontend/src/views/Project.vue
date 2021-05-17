<template>
    <div id="content">
        <Sidebar />
        <h2> project {{ $route.params.projectId }}</h2>
    </div>
</template>


<script>
import Sidebar from '../components/Sidebar.vue';

export default {
    components: {
        Sidebar,
    },
}

</script>


<style scoped>

</style>
